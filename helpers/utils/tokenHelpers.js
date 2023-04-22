import crypto from "crypto";
import bcrypt from "bcryptjs";

export const createToken = () => {

    const randomString = crypto.randomBytes(10).toString("hex");

    const salt = bcrypt.genSaltSync();
    const token = bcrypt.hashSync(randomString, salt);

    return token;
}

export const saveJwtToCookie = (user, res) => {

    const {COOKIE_EXPIRES, NODE_ENV} = process.env;

    const jwt = user.createJwt();

    return res
    .cookie("jwt", jwt, {
        maxAge: COOKIE_EXPIRES,
        httpOnly: NODE_ENV === "development" ? false : true
    })
    .status(200)
    .json({
        success:true, 
    });
    
}