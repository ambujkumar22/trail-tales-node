import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
dotenv.config();

const verifyToken = (req, res, next) => {
    let authentication = req.header('Authorization');
    if (!authentication) return res.status(401).send({status: "error", message: "Access Denied"});

    try {
        const token = authentication.split(' ')[1];
        const verified = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
        
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({status: "error", message: "Invalid Token"});
    }
};

export { verifyToken };