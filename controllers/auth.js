import expressAsyncHandler from "express-async-handler"
import User from "../models/User.js";
import { createToken } from "../helpers/utils/tokenHelpers.js";
import {sendMail} from "../helpers/mail/mailHelpers.js";
import { validatePassword } from "../helpers/input/inputHelpers.js";
import CustomError from "../helpers/error/CustomError.js";
import { Op } from "sequelize";

export const signUp = expressAsyncHandler(async(req, res, next) => {

    const {firstName, lastName, email, password} = req.body;
    const {EMAIL_VERIFICATION_TOKEN_EXPIRES, SMTP_USER, DOMAIN} = process.env;

    const existingUser = await User.findOne({where: {
        email: email
    }});

    const emailVerificationToken = createToken();

    if(existingUser && existingUser.isRegisterCompleted != true) {

        existingUser.emailVerificationToken = emailVerificationToken;
        existingUser.emailVerificationTokenExpires = new Date(Date.now() + Number(EMAIL_VERIFICATION_TOKEN_EXPIRES));

        await existingUser.save();
    }
    else{

        const newUser = await User.create({
            firstName: firstName, 
            lastName:lastName,
            email:email,
            password: password
        });
        
        if(!validatePassword(password)){
            return next(new CustomError(400, "Your password must contains: Minimum eight characters, at least one uppercase letter, one lowercase letter and one number."));
        }

        newUser.emailVerificationToken = emailVerificationToken;
        newUser.emailVerificationTokenExpires = new Date(Date.now() + Number(EMAIL_VERIFICATION_TOKEN_EXPIRES));
    
        await newUser.save();
    }

    const emailVerificationLink = `${DOMAIN}/api/auth/emailVerification?emailVerificationToken=${emailVerificationToken}`;

    const mailOptions = {
        from: SMTP_USER,
        to: email,
        subject: "Email Verification",
        html: `<h3>Here is your email verification <a href="${emailVerificationLink}">link</a>. This link is only valid for 30 minutes.</h3>`
    }
    
    sendMail(mailOptions);

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