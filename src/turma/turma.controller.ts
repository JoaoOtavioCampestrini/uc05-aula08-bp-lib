import { Request, Response } from "express";
import { TurmaService } from "./turma.service";
import { CursoService } from "../curso/curso.service";
import { InstrutorService } from "../instrutor/instrutor.service";
import { Turma } from "../shared/model/turma.model";

export class TurmaController {
  private turmaService: TurmaService;
  private cursoService: CursoService;
  private instrutorService: InstrutorService;

  constructor(
    turmaService: TurmaService,
    cursoService: CursoService,
    instrutorService: InstrutorService
  ) {
    this.turmaService = turmaService;
    this.cursoService = cursoService;
    this.instrutorService = instrutorService;
  }

  async create(req: Request<{}, {}, Turma>, res: Response) {
    const turma = req.body;

    if (!turma.curso_id || !turma.instrutor_id) {
      res
        .status(400)
        .send({ error: true, message: "Id do Curso ou Instrutor inválidos." });
      return;
    }

    try {
      // buscar o curso no banco
      // validar se existe
      const curso = await this.cursoService.getById(turma.curso_id);
      if (!curso) {
        res.status(404).send({
          error: true,
          message: `Curso com id ${turma.curso_id} não encontrado`,
        });
        return;
      }
      // buscar o instrutor
      // validar se existe
      const instrutor = await this.instrutorService.getById(turma.instrutor_id);
      if (!instrutor) {
        res.status(404).send({
          error: true,
          message: `Instrutor com id ${turma.instrutor_id} não encontrado`,
        });
        return;
      }

      const turmaWithId = await this.turmaService.create(turma);
      res.status(201).send(turmaWithId);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: true, message: error });
    }
  }

  async getAll(req: Request, res: Response) {}
}
