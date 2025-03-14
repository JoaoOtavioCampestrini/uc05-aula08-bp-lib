import { Aluno } from "../shared/model/aluno";
import { AlunoRepository } from "./aluno.repository";

export class AlunoService {
  private repository: AlunoRepository;

  constructor(repository: AlunoRepository) {
    this.repository = repository;
  }

  async createAluno(aluno: Aluno): Promise<Aluno> {
    return await this.repository.create(aluno);
  }

  async getAll(): Promise<Aluno[]> {
    return await this.repository.getAll();
  }

  async getById(id: number): Promise<Aluno | undefined> {
    return await this.repository.getById(id);
  }

  async updatePartOfAluno(id: number, aluno: Aluno): Promise<void> {

    await this.repository.updatePartOfAluno(id, aluno);
  }

  async updateAluno(id: number, aluno: Aluno): Promise<void> {
    await this.repository.updateAluno(id, aluno);
  }

  async deleteAluno(id: number):Promise<void> {
    await this.repository.delete(id);
  }
}
