import { Request, Response, NextFunction } from "express";
import TokenUtils from "../../utils/Token.js";
import { UserType } from "../../enums/UserTypes.js";

const isAuthorized = (requiredRoles: UserType[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.authorization;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        if (!TokenUtils.verifyToken(token)) {
            return res.status(401).json({ message: "Unauthorized - Invalid token signature" });
        }

        const decodedToken = TokenUtils.decodeToken(token);

        if (!decodedToken) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        if (!requiredRoles.includes(Number(decodedToken.userRole))) {
            return res.status(403).json({ message: "Forbidden - Insufficient permissions" });
        }

        next();
    };
};

export default isAuthorized;
