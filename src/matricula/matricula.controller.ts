import { ErrorRequestHandler, Request, Response } from "express";
import { MatriculaService } from "./matricula.service";
import { Matricula } from "../shared/model/matricula.model";
import { UserError } from "../shared/error/user.error";
import { CreateMatriculaDto } from "./dto/create-matricula-request.dto";

export class MatriculaController {
  private matriculaService: MatriculaService;

  constructor(matriculaService: MatriculaService) {
    this.matriculaService = matriculaService;
  }

  async create(req: Request<{}, {}, CreateMatriculaDto>, res: Response) {
    try {
      const matricula = req.body;
      if (!matricula.aluno_id) {
        res.status(400).send({ error: true, message: "Id do aluno inválido" });
        return;
      }
      if (!matricula.turma_id) {
        res.status(400).send({ error: true, message: "Id da turma inválido" });
        return;
      }
      const matriculaWithId = await this.matriculaService.create(matricula);
      if (!matriculaWithId || !matriculaWithId.id) {
        throw new UserError("Algo aconteceu na criação da matricula");
      }
      const matriculaWithAllInfo = await this.matriculaService.getById(
        matriculaWithId.id
      );
      res.status(201).send(matriculaWithAllInfo);
    } catch (error) {
      if (error instanceof UserError) {
        res.status(error.status).send({ error: true, message: error.message });
      } else {
        const message = error;
        console.log(error);
        res.status(500).send({ error: true, message });
      }
    }
  }
}
