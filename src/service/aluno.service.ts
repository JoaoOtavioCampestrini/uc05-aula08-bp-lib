import { Aluno } from "../model/aluno";
import { AlunoRepository } from "../repository/aluno.repository";

export class AlunoService {
  private repository: AlunoRepository;

  constructor(repository: AlunoRepository) {
    this.repository = repository;
  }

  async createAluno(aluno: Aluno): Promise<Aluno> {
    return await this.repository.createAluno(aluno);
  }
}
