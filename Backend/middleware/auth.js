const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token Missing" });
    }

    try {
        // 👇 Bearer remove karna
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decode;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = auth;