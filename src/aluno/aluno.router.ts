import express, { Router } from "express";
import { AlunoController } from "./aluno.controller";

export class AlunoRouter {
  private router: Router;
  private alunoController: AlunoController;

  constructor(alunoController: AlunoController) {
    this.alunoController = alunoController;
    this.router = express.Router();
    this.configureRoutes();
  }

  // Cria o repositorio, service, controller e rotas do aluno
  configureRoutes(): void {
    this.router.post("/", (req, res) =>
      this.alunoController.createAluno(req, res)
    );
    this.router.get("/", (req, res) =>
      this.alunoController.getAlunos(req, res)
    );
    this.router.get("/:id", (req, res) =>
      this.alunoController.getAlunoById(req, res)
    );
    this.router.put("/:id", (req, res) =>
      this.alunoController.updateAllFieldsAluno(req, res)
    );
    this.router.patch("/:id", (req, res) =>
      this.alunoController.updatePartOfAluno(req, res)
    );
    this.router.delete("/:id", (req, res) =>
      this.alunoController.deleteAluno(req, res)
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
