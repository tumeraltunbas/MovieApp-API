import crypto from "crypto";
import bcrypt from "bcryptjs";

export const createToken = () => {

    const randomString = crypto.randomBytes(10);
    const token = bcrypt.hashSync(randomString);

    return token;
}