import express, { Router } from "express";
import { AlunoController } from "./aluno.controller";
import { AlunoRepository } from "./aluno.repository";
import { AlunoService } from "./aluno.service";

export class AlunoRoutes {
  private database: any;
  private router: Router;

  private alunoRepository: AlunoRepository;
  private alunoService: AlunoService;
  private alunoController: AlunoController;

  constructor(database: any) {
    this.database = database;
    this.alunoRepository = new AlunoRepository(this.database);
    this.alunoService = new AlunoService(this.alunoRepository);
    this.alunoController = new AlunoController(this.alunoService);
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
