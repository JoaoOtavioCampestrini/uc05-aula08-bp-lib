import { Request, Response } from "express";
import { Curso } from "../shared/model/curso.model";
import { CursoService } from "./curso.service";

export class CursoController {
  private service: CursoService;

  constructor(service: CursoService) {
    this.service = service;
  }

  // CRUD - (C)reate
  async create(req: Request<{}, {}, Curso>, res: Response) {
    try {
      // ENTRADA
      const curso = req.body;
      // PROCESSAMENTO
      const novoCurso = await this.service.create(curso);
      // SAÍDA
      res.status(201).send(novoCurso);
    } catch (error) {
      // Imprime o erro
      console.log("Error - CursoController>create", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  async getAll(_: Request, res: Response<Curso[]>): Promise<void> {
    const cursos = await this.service.getAll();
    if (cursos.length === 0) {
      res.status(404).send([]);
      return;
    }

    res.status(200).send(cursos);
  }
}
