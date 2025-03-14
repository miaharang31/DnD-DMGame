import {Request, Response} from "express";
import User from "../models/users.model";
import UserRepository from "../repositories/users.repository"
import { StatusCodes } from "http-status-codes";

export default class UserController {
    async create(req: Request, res: Response) {
        console.log("Creating user... ");
        try {
            const user: User = req.body;
            // console.log(user);
            if(!user.email || !user.password) {
                res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide user with email and password"})
            } else {    
                const newUser = await UserRepository.save(user);
                res.status(201).json(newUser);
            }
        } catch (error) {
            console.error("Error in creating user: ", error);
            res.status(500).json({msg: "Error in creating user: ", error});
        }
    }

    async findAll(req: Request, res: Response) {
        console.log("Retrieving all users... ");
        try {
            const users = await UserRepository.retrieveAll({});
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({msg: "Error retrieving users: ", error});
        }
    }

    async findOne(req: Request, res: Response) {
        console.log("Retrieving user... ");
        try {
            const id = parseInt(req.params.id, 10);
            const user = await UserRepository.retrieveById(id);

            if(!user) res.status(400).json({msg: "User not found"});
            else res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: "Error retrieving user: ", error});
        }
    }
    
    async findByEmail(req: Request, res: Response) {
        try {
            const users = await UserRepository.retrieveAll({email: req.params.email});

            if(!users) res.status(404).json({msg: "User not found"});
            else res.status(200).json(users);
        } catch (error) {
            res.status(500).json({msg: "Error retrieving user: ", error});
        }
    }

    async login(req:Request, res: Response): Promise<any> {
        try {
            const {email, password} = req.body;
            
            if(!email||!password) {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide email and password"});
            }

            const user = await UserRepository.retrieveAll({email: email});
            if(!user.length) {
                return res.status(StatusCodes.NOT_FOUND).json({msg: "User with that email not found"});
            }

            const comparePassword = await UserRepository.comparePassword(user[0], password);

            if(!comparePassword) return res.status(StatusCodes.BAD_REQUEST).json({msg: "Incorrect password or email"});
            return res.status(StatusCodes.OK).json({user});

        } catch (error) {
            res.status(500).json({msg: "Error logging in user: ", error});
        }
    }
    
    async update(req: Request, res: Response) {
        try {
            const user = await UserRepository.update(req.body);

            if(!user) res.status(404).json({msg: "User not found"});
            else res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: "Error updating user: ", error});
        }
    }
    
    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await UserRepository.delete(id);

            if(!user) res.status(404).json({msg: "User not found"});
            else res.status(204).send();
        } catch (error) {
            res.status(500).json({msg: "Error deleting user: ", error});
        }
    }
}