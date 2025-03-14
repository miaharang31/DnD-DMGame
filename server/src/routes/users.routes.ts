import { Router } from "express";
import UserController from "../controllers/users.controller";

class UserRoutes {
    router = Router();
    controller = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.controller.findAll);
        this.router.get("/:id", this.controller.findOne);
        this.router.get("/email/:email", this.controller.findByEmail);
        this.router.post("/register", this.controller.create);
        this.router.post("/login", this.controller.login);
        this.router.put("/update", this.controller.update);
        this.router.delete("/:id", this.controller.delete);
    }
}

export default new UserRoutes().router;