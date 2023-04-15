export const validatePassword = (password) => {
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
    return password.match(passwordRegex);
}

export const capitalize = (text) => {
    
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

}