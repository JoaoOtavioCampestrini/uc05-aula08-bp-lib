import express, { Router } from "express";
import { InstrutorController } from "./instrutor.controller";

export class InstrutorRouter {
  private router: Router;
  private instrutorController: InstrutorController;

  constructor(instrutorController: InstrutorController) {
    this.instrutorController = instrutorController;
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get("/", (req, res) =>
      this.instrutorController.getAll(req, res)
    );
    this.router.post("/", (req, res) =>
      this.instrutorController.create(req, res)
    );
    this.router.patch("/", (req, res) => {});
    this.router.delete("/", (req, res) => {});
  }

  getRouter(): Router {
    return this.router;
  }
}
