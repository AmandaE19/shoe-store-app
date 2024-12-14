import { Router } from "express";
import { getShoes, createShoe, deleteShoe, editShoe, getShoeById } from "../controllers/shoesController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken, getShoes);

router.get("/:id", verifyToken, getShoeById)

router.post("/", verifyToken, createShoe);

router.delete("/:id", deleteShoe);

router.put("/:id", editShoe);

export default router;
