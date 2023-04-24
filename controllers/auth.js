import expressAsyncHandler from "express-async-handler"
import User from "../models/User.js";
import { createToken, saveJwtToCookie } from "../helpers/utils/tokenHelpers.js";
import {sendEmailVerificationLinkToUser, sendMail} from "../helpers/mail/mailHelpers.js";
import { check2FA, validatePassword } from "../helpers/input/inputHelpers.js";
import CustomError from "../helpers/error/CustomError.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import moment from "moment";
import randomInteger from "random-int";
import { sendPhoneCode, sendSms } from "../helpers/sms/smsHelpers.js";

export const signUp = expressAsyncHandler(async(req, res, next) => {

    const {firstName, lastName, email, password} = req.body;

    if(!password || password == ""){
        return next(new CustomError(400, "Please provide a password"));
    }

    const existingUser = await User.findOne({
        where: {
            email:email
        }
    });

    if(existingUser && existingUser.isRegisterCompleted != true){

        sendEmailVerificationLinkToUser(existingUser);
    }
    else{

        if(!validatePassword(password)){
            
            return next(new CustomError(400, "Your password must contains: Minimum eight characters, at least one uppercase letter, one lowercase letter and one number."));
        }

        const newUser = await User.create({
            firstName: firstName, 
            lastName:lastName,
            email:email,
            password: password
        }); 

        sendEmailVerificationLinkToUser(newUser);

    }

    return res
    .status(201)
    .json({success:true, message: `Email verification token sent to ${email}`});

});


export const emailVerification = expressAsyncHandler(async(req, res, next) => {
    
    const {emailVerificationToken} = req.query;

    const user = await User.findOne({where: {
        [Op.and] : [
            {emailVerificationToken: emailVerificationToken}, 
            {emailVerificationTokenExpires: {[Op.gte]: Date.now()}}
        ]
    }});
    

    if(!user){
        return next(new CustomError(400, "Email verification token wrong or expired"));
    }

    user.emailVerificationToken = null;
    user.emailVerificationTokenExpires = null;
    user.isRegisterCompleted = true;
    user.isEmailVerified = true;

    await user.save();

    saveJwtToCookie(user, res);

});

export const signIn = expressAsyncHandler(async(req, res, next) => {
    
    const {email, password} = req.body;

    if(!email || !password) {
        return next(new CustomError(400, "Please provide an email and password"));
    }
    
    const user = await User.findOne({where: {
        email:email
    }});

    if(user.googleId){
        return next(new CustomError(400, "Please sign in with Google"));
    }

    if(user.isRegisterCompleted === false || user.isEmailVerified === false) {

       sendEmailVerificationLinkToUser(user);

        return next(new CustomError(403, "You did not verify your email."));
    }

    if(!bcrypt.compareSync(password, user.password)){
        return next(new CustomError(400, "Check your credentials"));
    }

    if(user.isBlocked === false && user.isActive === false){
        
        user.isActive = true;
        await user.save();
    }

    if(user.isTwoFactorEnabled === true){
        
        return res
        .status(200)
        .json({
            success: true,
            id: user.id
        });

    }

    saveJwtToCookie(user, res);

});

export const googleAuthCallback = expressAsyncHandler(async(req, res, next) => {

    const {COOKIE_EXPIRES, NODE_ENV} = process.env;
    
    const user = req.user;
    const jwt = user.createJwt();

    res
    .cookie("jwt", jwt, {
        maxAge: COOKIE_EXPIRES,
        httpOnly: NODE_ENV === "development" ? false : true
    });

    res
    .redirect("/api/user/profile");

});

export const logout = (req, res, next) => {
    res
    .cookie("jwt", "", {maxAge: Date.now()})
    .status(200)
    .json({success: true});
}

export const passwordChange = expressAsyncHandler(async(req, res, next) => {

    const {oldPassword, newPassword, newPasswordRepeat} = req.body;

    if(newPassword !== newPasswordRepeat){
        return next(new CustomError(400, "Passwords does not match"));
    }

    const user = await User.findOne({where: {
        id: req.user.id
    }}); 

    if(bcrypt.compareSync(newPassword, user.password)){
        return next(new CustomError(400, "Old password and new password can not be same"));
    }

    if(!bcrypt.compareSync(oldPassword, user.password)){
        return next(new CustomError(400, "Old password is invalid"));
    }

    if(!validatePassword(newPassword)){
        return next(new CustomError(400, "Your password must contains: Minimum eight characters, at least one uppercase letter, one lowercase letter and one number."));
    }

    user.password = newPassword;
    user.lastPasswordChangedAt = Date.now();
    await user.save();

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "About Password Changing",
        html: `<h3>Your password has been changed at ${moment(user.lastPasswordChangedAt).format("DD.MM.YYYY HH:mm:ss")}. If you did not do that, contact us!</h3>`
    }

    sendMail(mailOptions);

    return res
    .status(200)
    .json({
        success:true, 
        message: "Your password has been changed"
    });

});

export const emailChange = expressAsyncHandler(async(req, res, next) => {

    
    const {email} = req.body;

    const user = await User.findOne({where: {
        id: req.user.id
    }});

    user.email = email;
    user.isEmailVerified = false;

    await user.save();

    sendEmailVerificationLinkToUser(user);

    return res
    .status(200)
    .json({
        success:true, 
        message:`Email verification code sent to ${email}`
    });

})

export const forgotPassword = expressAsyncHandler(async(req, res, next) => {

    const {email} = req.body;
    const {DOMAIN, RESET_PASSWORD_TOKEN_EXPIRES, SMTP_USER} = process.env;

    const user = await User.findOne({where : {
        email: email
    }});

    const resetPasswordToken = createToken();
    const resetPasswordLink = `${DOMAIN}/api/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`;
    
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpires = new Date(Date.now() + RESET_PASSWORD_TOKEN_EXPIRES);

    await user.save();

    const mailOptions = {
        from: SMTP_USER,
        to: email,
        subject: "Reset Password Request",
        html: `<h3>Your reset password <a href="${resetPasswordLink}">link</a>.</h3>`
    };

    sendMail(mailOptions);

    return res
    .status(200)
    .json({
        success:true, 
        message: `Reset password link sent to ${email}`
    });


});

export const resetPassword = expressAsyncHandler(async(req, res, next) => {
    
    const {resetPasswordToken} = req.params;
    const {password, passwordRepeat} = req.body;

    const user = await User.findOne({where: {
        [Op.and]: [
            {resetPasswordToken: resetPasswordToken},
            {resetPasswordTokenExpires:  {[Op.gte]: Date.now()}}
        ]
    }});

    if(!user){
        return next(new CustomError(400, "Your reset password token wrong or expired"));
    }

    if(password != passwordRepeat){
        return next(new CustomError(400, "Your passwords do not match"));
    }

    if(!validatePassword(password)){
        return next(new CustomError(400, "Your password must contains: Minimum eight characters, at least one uppercase letter, one lowercase letter and one number."));
    }

    user.password = password;
    user.lastPasswordChangedAt = Date.now();
    await user.save();

    return res
    .status(200)
    .json({
        success: true, 
        message: "Your password has been changed"
    });

});

export const deactiveAccount = expressAsyncHandler(async(req, res, next) => {
    
    const {password} = req.body;

    const user = await User.findOne({where: {
        id: req.user.id
    }});

    if(!bcrypt.compareSync(password, user.password)){
        return next(new CustomError(400, "Invalid password"));
    }

    user.isActive = false;
    await user.save();

    return res
    .status(200)
    .json({success:true, message: "Your account has been deactivated"});

});

export const enable2FA = expressAsyncHandler(async(req, res, next) => {

    const secret = speakeasy.generateSecret();

    const user = await User.findOne({
        where: {
            id: req.user.id,
            isActive: true
        }
    });

    user.twoFactorSecret = secret.base32;
    await user.save();

    qrcode.toDataURL(secret.otpauth_url, (err, qrCode) => {
        
        if(err){
            return next(err);
        }

        return res
        .status(200)
        .json({
            success: true,
            qrCode: qrCode
        });

    });
});

export const verify2FA = expressAsyncHandler(async(req, res, next) => {

    const {token} = req.body;

    const user = await User.findOne({
        where: {
            id: req.user.id
        },
        attributes: ["id", "twoFactorSecret"]
    });

    if(!check2FA(user.twoFactorSecret, token)){
        return next(new CustomError(400, "Token is invalid"));
    }

    user.isTwoFactorEnabled = true;
    await user.save();

    return res
    .status(200)
    .json({
        success: true,
    });
    
});

export const validate2FA = expressAsyncHandler(async(req, res, next) => {

    const {token, userId} = req.body;
    
    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!check2FA(user.twoFactorSecret, token)){
        return next(new CustomError(400, "Token is invalid"));
    }

    saveJwtToCookie(user, res);

});

export const addPhone = expressAsyncHandler(async(req, res, next) => {

    const {phoneNumber} = req.body;

    const user = await User.findOne({
        where: {
            id: req.user.id
        }
    });

    sendPhoneCode(user, phoneNumber);

    return res
    .status(200)
    .json({
        success: true,
        message: "SMS successfully sent"
    });
    
});

export const verifyPhone = expressAsyncHandler(async(req, res, next) => {

    const {phoneCode} = req.body;

    const user = await User.findOne({
        where: {
            [Op.and] : [
                {phoneCode: phoneCode}, 
                {phoneCodeExpires: {[Op.gte]: Date.now()}}
            ]
        }
    });

    if(!user){
        return next(new CustomError(400, "Your phone verification code wrong or expired"));
    }

    user.phoneCode = null;
    user.phoneCodeExpires = null;
    user.isPhoneVerified = true;

    await user.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Your phone has been verified"
    });

});

export const validatePhone = expressAsyncHandler(async(req, res, next) => {
    
    // second option for 2fa
    
    const {email, phoneCode} = req.body;

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if(user.phoneCode != phoneCode || user.phoneCodeExpires < Date.now()){
    
        return next(new CustomError(400, "Your phone code wrong or expired"));
    }

    user.phoneCode = null;
    user.phoneCodeExpires = null;

    await user.save();

    saveJwtToCookie(user, res);

});