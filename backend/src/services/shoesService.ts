import { db } from "../config/firebase";
import { Shoe } from "../models/shoe";

export async function getAllShoes(): Promise<Shoe[]> {
    try {
        const shoes: Shoe[] = [];
        const snapshot = await db.collection("stock").get();

        snapshot.forEach((doc) => {
            shoes.push(doc.data() as Shoe);
        });
        return shoes;
    } catch (error: any) {
        console.error("Erro ao buscar sapatos:", error);
        throw new Error("Erro ao buscar sapatos no banco de dados.");
    }
};

export async function getShoe(shoeId: string): Promise<Shoe | undefined> {
    try {
        const shoeDoc = await db.collection("stock").doc(shoeId).get();

        if (!shoeDoc.exists) {
            return undefined;
        }

        return shoeDoc.data() as Shoe;

    } catch (error: any) {
        console.error("Erro ao buscar sapato:", error);
        throw new Error("Erro ao buscar sapato no banco de dados.");
    }
}

export async function addShoe(shoeData: Shoe): Promise<void> {
    const date = new Date();
    const shoeId = date.getTime().toString();

    try {
        const docRef = db.collection("stock").doc(shoeId);

        await docRef.set({
            id: shoeId,
            category: shoeData.category,
            brand: shoeData.brand,
            size: shoeData.size,
            price: shoeData.price,
            quantity: shoeData.quantity,
            color: shoeData.color,
        });

    } catch (error: any) {
        console.error("Erro ao adicionar sapato:", error);
        throw new Error("Erro ao adicionar sapato no banco de dados.");
    }
};

export async function removeShoe(shoeId: string): Promise<void> {
    try {
        await db.collection("stock").doc(shoeId).delete();

    } catch (error: any) {
        console.error("Erro ao buscar sapato:", error);
        throw new Error("Erro ao buscar sapato no banco de dados.");
    }
};

export async function updateShoe(shoeId: string, updatedData: Partial<Shoe>): Promise<void> {
    try {
        const docRef = db.collection("stock").doc(shoeId);
        
        await docRef.update(updatedData);
    } catch (error: any) {
        console.error("Erro ao atualizar sapato:", error);
        throw new Error("Erro ao atualizar sapato no banco de dados.");
    }
};
