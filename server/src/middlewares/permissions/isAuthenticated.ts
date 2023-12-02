import { Request, Response, NextFunction } from "express";
import TokenUtils from "../../utils/Token.js";
import { UserType, UserTypesNames } from "../../enums/UserTypes.js";
import pharmacist from "../../models/pharmacist.js";
interface TokenPayload {
    userId: string;
    userRole: UserType;
}

declare global {
    namespace Express {
        interface Request {
            userId: string;
            userRole: UserType;
        }
    }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    let token, decodedToken: any;

    try {
        token = req.cookies.authorization;

        if (!TokenUtils.verifyToken(token)) {
            return res.status(401).json({ message: "Unauthorized - Invalid token signature" });
        }

        decodedToken = TokenUtils.decodeToken(token);

        if (decodedToken.userRole === UserType.PHARMACIST) {
            try {
                const pharm = await pharmacist.findById(decodedToken.userId).exec();
                if (!pharm || pharm.status !== "accepted") {
                    return res.status(401).json({ message: "Unauthorized - Invalid token" });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    } catch {
        if (!decodedToken) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" }); // TODO
        }
    }

    next();
};

export default isAuthenticated;
