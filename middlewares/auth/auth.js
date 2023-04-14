import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {

    const {JWT_SECRET_KEY} = process.env;
    const token = req.cookies.jwt;

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        
        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    });
    
}