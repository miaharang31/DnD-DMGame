import { ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";
import { pool } from "../db/app";  // Assuming pool is exported from your DB connection file
import Character from "../models/characters.model";

interface ICharacterRepository {
    save(character: Character): Promise<Character>;
    retrieveAll(searchParams: { userid?: number; name?: string }): Promise<Character[]>;
    retrieveById(id: number): Promise<Character | undefined>;
    update(character: Character): Promise<number>;
    delete(id: number): Promise<number>;
}

class CharacterRepository implements ICharacterRepository {
    // Save a new character
    async save(character: Character): Promise<Character> {
        console.log("Querying DB...");
        if (!character.password) {
            throw new Error("Password is undefined");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPW = bcrypt.hashSync(character.password, salt);

        try {
            const [res] = await pool.execute<ResultSetHeader>(
                "INSERT INTO characters (email, password) VALUES (?,?)",
                [character.email, hashedPW]
            );
            const retrievedCharacter = await this.retrieveById(res.insertId);
            return retrievedCharacter!;
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }

    // Retrieve all characters based on search parameters
    async retrieveAll(searchParams: { userid?: number; name?: string }): Promise<Character[]> {
        let query = "SELECT * FROM characters";
        const conditions: string[] = [];


        if (searchParams?.userid) {
            conditions.push(`userid = ${searchParams.userid}`);
        }
        if (searchParams?.name) {
            conditions.push(`LOWER(name) LIKE '%${searchParams.name}%'`);
        }

        if (conditions.length) {
            query += " WHERE " + conditions.join(" AND ");
        }

        try {
            const [rows] = await pool.execute<Character[]>(query);
            return rows;
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }

    // Retrieve a character by ID
    async retrieveById(id: number): Promise<Character | undefined> {
        try {
            const [rows] = await pool.execute<Character[]>(
                "SELECT * FROM characters WHERE id = ?",
                [id]
            );
            return rows?.[0];
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }

    // Compare passwords
    async comparePassword(character: Character, password: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, character.password!);
        } catch (err) {
            console.error("Error comparing password: ", err);
            throw err;
        }
    }

    // Update a character
    async update(character: Character): Promise<number> {
        try {
            const [res] = await pool.execute<ResultSetHeader>(
                `UPDATE characters SET
                name = ?, 
                level = ?,
                race = ?, 
                class = ?,
                background = ?, 
                alignment = ?,
                hp = ?, 
                temphp = ?,
                maxhp = ?, 
                ac = ?,
                speed = ?, 
                personalityTraits = ?,
                ideals = ?, 
                bonds = ?,
                flaws = ?, 
                age = ?, 
                height = ?,
                weight = ?, 
                eyes = ?,
                skin = ?, 
                hair = ?,
                allies = ?, 
                treasure = ?,
                backstory = ?
                WHERE id = ?`,
                [character.name, 
                    character.level,
                    character.race,
                    character.class,
                    character.background,
                    character.alignment,
                    character.hp,
                    character.temphp,
                    character.maxhp,
                    character.ac,
                    character.speed,
                    character.personalityTraits,
                    character.ideals,
                    character.bonds,
                    character.flaws,
                    character.age,
                    character.height,
                    character.weight,
                    character.eyes,
                    character.skin,
                    character.hair,
                    character.allies,
                    character.treasure,
                    character.backstory]
            );
            return res.affectedRows;
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }

    // Delete a character
    async delete(id: number): Promise<number> {
        try {
            const [res] = await pool.execute<ResultSetHeader>(
                "DELETE FROM characters WHERE id = ?",
                [id]
            );
            return res.affectedRows;
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }
}

export default new CharacterRepository();
