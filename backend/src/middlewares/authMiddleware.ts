import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase";

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized request." });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.body.user = decodedToken;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido." });
    }
};