import { Request, Response } from "express";
import { CharacterRepository } from "../repositories/characters.repository";
import Character from "../models/characters.model";

export class CharacterController {
    constructor(private repo: CharacterRepository) {}

    createCharacter = async (req: Request, res: Response) => {
        try {
            const character: Character = req.body;
            const id = await this.repo.createCharacter(character);
            res.status(201).json({ id });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create character." });
        }
    };

    getCharacter = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const character = await this.repo.getCharacterById(id);
            if (character) {
                res.json(character);
            } else {
                res.status(404).json({ error: "Character not found." });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch character." });
        }
    };

    updateCharacter = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const character: Partial<Character> = req.body;
            await this.repo.updateCharacter(id, character);
            res.json({ message: "Character updated." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to update character." });
        }
    };

    deleteCharacter = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            await this.repo.deleteCharacter(id);
            res.json({ message: "Character deleted." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to delete character." });
        }
    };

    listCharacters = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.userId);
            const characters = await this.repo.listCharactersByUser(userId);
            res.json(characters);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to list characters." });
        }
    };
}
