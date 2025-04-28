import { Router } from "express";
import { CharacterController } from "../controllers/characters.controller";
import { CharacterRepository } from "../repositories/characters.repository";
import { pool } from "../db/app"; // <-- Your mysql2 pool connection

const repo = new CharacterRepository(pool);
const controller = new CharacterController(repo);
const router = Router();

router.post("/", controller.createCharacter);
router.get("/:id", controller.getCharacter);
router.put("/:id", controller.updateCharacter);
router.delete("/:id", controller.deleteCharacter);
router.get("/user/:userId", controller.listCharacters);

export default router;
