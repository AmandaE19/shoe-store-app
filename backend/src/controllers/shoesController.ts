import { Request, Response } from "express";
import { getAllShoes, addShoe, removeShoe, updateShoe, getShoe } from "../services/shoesService";
import { Shoe } from "../models/shoe";

export async function getShoes(req: Request, res: Response): Promise<void> {
    try {
        const shoes = await getAllShoes();

        if (shoes.length === 0) {
            res.status(404).json({
                message: "Não há sapatos cadastrados.",
                data: []
            });
        } else {
            res.status(200).json({
                message: "Sapatos listados com sucesso!",
                data: shoes
            });
        }
    } catch (error: any) {
        console.error("Erro ao listar sapatos:", error);
        res.status(500).json({
            message: "Erro ao listar sapatos",
            error: error.message
        });
    }
};

export async function getShoeById(req: Request, res: Response): Promise<void> {
    try {
        const shoe: Shoe | undefined = await getShoe(req.params.id);

        if (!shoe) {
            res.status(404).json({
                message: "Sapato não encontrado.",
                data: []
            });
        } else {
            res.status(200).json({
                message: "Sapato encontrado com sucesso!",
                data: shoe
            });
        }
    } catch (error: any) {
        console.error("Erro ao buscar sapato:", error);
        res.status(500).json({
            message: "Erro ao buscar sapato",
            error: error.message
        });
    }
};

export async function createShoe(req: Request, res: Response): Promise<void> {
    const shoeData: Shoe = req.body;

    if (!shoeData.category || !shoeData.brand || !shoeData.size || !shoeData.price || !shoeData.quantity || !shoeData.color) {
        res.status(400).json({ message: "Todos os campos são obrigatórios: categoria, marca, tamanho, preço, quantidade e cor." });
        return;
    }

    try {
        await addShoe(shoeData);

        res.status(201).json({
            message: "Sapato criado com sucesso!",
            data: shoeData
        });
    } catch (error: any) {
        console.error("Erro ao criar sapato:", error);
        res.status(500).json({
            message: "Erro ao criar sapato",
            error: error.message
        });
    }
};

export async function deleteShoe(req: Request, res: Response): Promise<void> {
    try {
        await removeShoe(req.params.id);

        res.status(200).json({
            message: "Sapato removido com sucesso!",
        });

    } catch (error: any) {
        console.error("Erro ao remover sapato:", error);
        res.status(500).json({
            message: "Erro ao remover sapato",
            error: error.message
        });
    }
};

export async function editShoe(req: Request, res: Response): Promise<void> {
    const shoeId = req.params.id;
    const updatedData: Partial<Shoe> = req.body;

    try {
        const shoe = await getShoe(shoeId);

        if (!shoe) {
            res.status(404).json({
                message: "Sapato não encontrado.",
            });
        }

        await updateShoe(shoeId, updatedData);

        res.status(200).json({
            message: "Sapato atualizado com sucesso!",
            data: updatedData,
        });
    } catch (error: any) {
        console.error("Erro ao atualizar sapato:", error);
        res.status(500).json({
            message: "Erro ao atualizar sapato",
            error: error.message,
        });
    }
};

