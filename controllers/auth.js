import expressAsyncHandler from "express-async-handler"
import User from "../models/User.js";
import { createToken } from "../helpers/utils/tokenHelpers.js";
import {sendEmailVerificationLinkToUser, sendMail} from "../helpers/mail/mailHelpers.js";
import { validatePassword } from "../helpers/input/inputHelpers.js";
import CustomError from "../helpers/error/CustomError.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

export const signUp = expressAsyncHandler(async(req, res, next) => {g

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
    const {COOKIE_EXPIRES, NODE_ENV} = process.env;

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

    const jwt = user.createJwt();

    res
    .cookie("jwt", jwt, {
        maxAge: COOKIE_EXPIRES,
        httpOnly: NODE_ENV === "development" ? false : true
    })
    .status(200)
    .json({
        success:true, 
        message: "Your email has been verified"
    });

});

export const signIn = expressAsyncHandler(async(req, res, next) => {
    
    const {email, password} = req.body;
    const {COOKIE_EXPIRES, NODE_ENV} = process.env;

    if(!email || !password) {
        return next(new CustomError(400, "Please provide an email and password"));
    }
    
    const user = await User.findOne({where: {
        email:email
    }});

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

    const jwt = user.createJwt();

    res
    .cookie("jwt", jwt, {
        maxAge: COOKIE_EXPIRES,
        httpOnly: NODE_ENV === "development" ? false : true
    })
    .status(200)
    .json({
        success:true, 
        message: "Login successfull"
    });

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

    return res
    .status(200)
    .json({success:true, message: "Your password has been changed"});

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
    .json({success:true, message: `Reset password link sent to ${email}`})


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
    .json({success: true, message: "Your password has been changed"});

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