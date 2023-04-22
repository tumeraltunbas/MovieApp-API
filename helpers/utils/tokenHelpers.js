import crypto from "crypto";
import bcrypt from "bcryptjs";

export const createToken = () => {

    const randomString = crypto.randomBytes(10).toString("hex");

    const salt = bcrypt.genSaltSync();
    const token = bcrypt.hashSync(randomString, salt);

    return token;
}