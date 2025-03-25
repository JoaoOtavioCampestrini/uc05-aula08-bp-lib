import { Request, Response } from "express";
import { InstrutorService } from "./instrutor.service";
import { Instrutor } from "../shared/model/instrutor.model";

export class InstrutorController {
  private service: InstrutorService;

  constructor(service: InstrutorService) {
    this.service = service;
  }

  async getAll(_: Request, res: Response<Instrutor[]>): Promise<void> {
    const instrutores = await this.service.getAll();
    if (instrutores.length === 0) {
      res.status(404).send([]);
      return;
    }

    res.status(200).send(instrutores);
  }

  async create(req: Request<{}, {}, Instrutor>, res: Response): Promise<void> {
    // recuperar os dados do instrutor do body (corpo da requisição)
    const instrutor = req.body;
    try {
      // enviar para o banco
      const instrutorWithId = await this.service.create(instrutor);
      // caso seja criado, retornar com o id e status 201
      res.status(201).send(instrutorWithId);
    } catch (error) {
      // caso ocorra algum erro, retorna o status 500 com mensagem do erro
      console.log(error);
      res.status(500).send({ error: true, message: error });
    }
  }
}
