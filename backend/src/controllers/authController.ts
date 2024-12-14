import { Request, Response, NextFunction } from "express";
import { clientAuth } from "../config/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);

        const token = await userCredential.user?.getIdToken();

        if (!token) {
            res.status(400).json({ message: "Erro ao gerar token" });
            return;
        }

        res.status(200).json({
            message: "Login bem-sucedido",
            token
        });

    } catch (error: any) {
        console.error("Erro de autenticação:", error);
        res.status(401).json({
            message: "E-mail ou senha inválidos",
            error: error.message
        });
    }
};
