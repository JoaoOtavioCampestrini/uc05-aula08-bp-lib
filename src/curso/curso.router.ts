import express, { Router } from "express";
import { CursoController } from "./curso.controller";

export class CursoRouter {
  private router: Router;
  private controller: CursoController;

  constructor(cursoController: CursoController) {
    this.controller = cursoController;
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get("/", (req, res) => this.controller.getAll(req, res));
    this.router.post("/", (req, res) => this.controller.create(req, res));
    this.router.patch("/", (req, res) => {});
    this.router.delete("/", (req, res) => {});
  }

  getRouter(): Router {
    return this.router;
  }
}
