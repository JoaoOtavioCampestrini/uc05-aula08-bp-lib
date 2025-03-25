import express, { Router } from "express";
import { TurmaRepository } from "./turma.repository";
import { TurmaService } from "./turma.service";
import { TurmaController } from "./turma.controller";

export class TurmaRouter {
  private controller: TurmaController;
  private router: Router;
  constructor(controller: TurmaController) {
    this.controller = controller;
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
