import { Aluno } from "../shared/model/aluno.model";
import { AlunoService } from "./aluno.service";
import { Request, Response } from "express";
import { CreateAlunoResponseDto } from "./dto/create-aluno-response.dto";
import { ErrorResponseDto } from "../shared/error/dto/error.dto";
import { CreateAlunoRequestDto } from "./dto/create-aluno-request.dto";

export class AlunoController {
  private service: AlunoService;

  constructor(service: AlunoService) {
    this.service = service;
  }

  // CRUD - (C)reate
  async createAluno(
    req: Request<{}, {}, CreateAlunoRequestDto>,
    res: Response<CreateAlunoResponseDto | ErrorResponseDto>
  ) {
    try {
      // ENTRADA
      const aluno = req.body;
      // PROCESSAMENTO
      const novoAluno = await this.service.createAluno(aluno);
      // SAÍDA
      res.status(201).send(novoAluno);
    } catch (error) {
      // Imprime o erro
      console.log("Error - AlunoController>createAluno", error);
      res.status(500).send({ error: true, message: error as string });
    }
  }

  // CRUD - (R)etrieve
  async getAlunos(_: Request, res: Response) {
    try {
      // Busca os dados no banco
      const alunos = await this.service.getAll();
      // Retorna os dados
      res.status(200).send(alunos);
    } catch (error) {
      console.log("Error - AlunoController>getAlunos", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  async getAlunoById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do aluno" });
        return;
      }
      const alunoId = parseInt(id);
      if (isNaN(alunoId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }

      // Busca os dados no banco
      const aluno = await this.service.getById(alunoId);
      if (!aluno) {
        res.status(404).send({ error: true, message: "Aluno não encontrado" });
        return;
      }

      // Retorna os dados
      res.status(200).send(aluno);
    } catch (error) {
      console.log("Error - AlunoController>getAlunoById", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // CRUD - (U)pdate
  async updatePartOfAluno(
    req: Request<{ id: string }, {}, Aluno>,
    res: Response
  ) {
    try {
      // Pega o id dos parametros de rota
      const { id } = req.params;
      // Valida se o id foi informado
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do aluno" });
        return;
      }
      // Converte o id para number
      const alunoId = parseInt(id);
      // Valida se é um número
      if (isNaN(alunoId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }
      // Pegar os dados do aluno
      const aluno = req.body;
      // Chama o service para atualizar o aluno
      await this.service.updateAluno(alunoId, aluno);
      // Busca os dados atualizados do aluno e retorna
      const alunoAtualizado = await this.service.getById(alunoId);
      res.status(200).send(alunoAtualizado);
    } catch (error) {
      console.log("Error - AlunoController>updateAluno", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  async updateAllFieldsAluno(
    req: Request<{ id: string }, {}, Aluno>,
    res: Response
  ) {
    try {
      // Pega o id dos parametros de rota
      const { id } = req.params;
      // Valida se o id foi informado
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do aluno" });
        return;
      }
      // Converte o id para number
      const alunoId = parseInt(id);
      // Valida se é um número
      if (isNaN(alunoId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }
      // Pegar os dados do aluno
      const aluno = req.body;
      // Chama o service para atualizar o aluno
      await this.service.updateAluno(alunoId, aluno);

      const alunoAtualizado = await this.service.getById(alunoId);
      res.status(200).send(alunoAtualizado);
      console.log(alunoAtualizado);
    } catch (error) {
      console.log("Error - AlunoController>updateAluno", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  async deleteAluno(req: Request<{ id: string }, {}, Aluno>, res: Response) {
    try {
      // Pega o id dos parametros de rota
      const { id } = req.params;
      // Valida se o id foi informado
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do aluno" });
        return;
      }
      // Converte o id para number
      const alunoId = parseInt(id);
      // Valida se é um número
      if (isNaN(alunoId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }
      // Chama o service para atualizar o aluno
      await this.service.deleteAluno(alunoId);
      res.status(200).send();
    } catch (error) {
      console.log("Error - AlunoController>deleteAluno", error);
      res.status(500).send({
        error: true,
        message: "Internal Error",
      });
    }
  }
}
