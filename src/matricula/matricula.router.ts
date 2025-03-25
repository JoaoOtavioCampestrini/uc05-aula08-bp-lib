import express, { Router } from "express";
import { MatriculaController } from "./matricula.controller";

export class MatriculaRouter {
  private router: Router;

  private matriculaController: MatriculaController;

  constructor(matriculaController: MatriculaController) {
    this.matriculaController = matriculaController;
    this.router = express.Router();
    this.configureRoutes();
  }

  // Cria o repositorio, service, controller e rotas do aluno
  private configureRoutes(): void {
    this.router.post("/", (req, res) =>
      this.matriculaController.create(req, res)
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
