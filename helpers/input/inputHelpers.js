import speakeasy from "speakeasy";

export const validatePassword = (password) => {
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
    return password.match(passwordRegex);
}

export const capitalize = (text) => {
    
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

}

export const check2FA = (secret, token) => {

    return speakeasy.totp.verify({
        encoding: "base32",
        secret: secret,
        token: token,
    });

}