import { ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";
import { pool } from "../db/app";  // Assuming pool is exported from your DB connection file
import User from "../models/users.model";

interface IUserRepository {
    save(user: User): Promise<User>;
    retrieveAll(searchParams: { email?: string; }): Promise<User[]>;
    retrieveById(id: number): Promise<User | undefined>;
    update(user: User): Promise<number>;
    delete(id: number): Promise<number>;
}

class UserRepository implements IUserRepository {
    // Save a new user
    async save(user: User): Promise<User> {
        console.log("Querying DB...");
        if (!user.password) {
            throw new Error("Password is undefined");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPW = bcrypt.hashSync(user.password, salt);

        try {
            const [res] = await pool.execute<ResultSetHeader>(
                "INSERT INTO users (email, password) VALUES (?,?)",
                [user.email, hashedPW]
            );
            const retrievedUser = await this.retrieveById(res.insertId);
            return retrievedUser!;
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }

    // Retrieve all users based on search parameters
    async retrieveAll(searchParams: {email?: string;}): Promise<User[]> {
        let query = "SELECT * FROM users";
        const conditions: string[] = [];

        if (searchParams?.email) {
            conditions.push(`LOWER(email) LIKE '%${searchParams.email}%'`);
        }

        if (conditions.length) {
            query += " WHERE " + conditions.join(" AND ");
        }

        try {
            const [rows] = await pool.execute<User[]>(query);
            return rows;
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }

    // Retrieve a user by ID
    async retrieveById(id: number): Promise<User | undefined> {
        try {
            const [rows] = await pool.execute<User[]>(
                "SELECT * FROM users WHERE id = ?",
                [id]
            );
            return rows?.[0];
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }

    // Compare passwords
    async comparePassword(user: User, password: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, user.password!);
        } catch (err) {
            console.error("Error comparing password: ", err);
            throw err;
        }
    }

    // Update a user
    async update(user: User): Promise<number> {
        if (!user.password) {
            throw new Error("Password is undefined");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPW = bcrypt.hashSync(user.password, salt);

        try {
            const [res] = await pool.execute<ResultSetHeader>(
                "UPDATE users SET email = ?, password = ? WHERE id = ?",
                [user.email, hashedPW, user.id]
            );
            return res.affectedRows;
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }

    // Delete a user
    async delete(id: number): Promise<number> {
        try {
            const [res] = await pool.execute<ResultSetHeader>(
                "DELETE FROM users WHERE id = ?",
                [id]
            );
            return res.affectedRows;
        } catch (err) {
            console.error("Database error: ", err);
            throw err;
        }
    }
}

export default new UserRepository();
