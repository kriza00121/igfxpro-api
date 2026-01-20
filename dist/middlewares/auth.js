"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Authorization header missing',
        });
    }
    req.headers.authorization = authHeader;
    next();
}
//# sourceMappingURL=auth.js.map