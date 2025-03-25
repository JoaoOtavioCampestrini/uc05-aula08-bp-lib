import { Turma } from "../shared/model/turma.model";
import { TurmaRepository } from "./turma.repository";

export class TurmaService {
  private repository: TurmaRepository;

  constructor(repository: TurmaRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<Turma[]> {
    return this.repository.getAll();
  }

  async create(turma: Turma): Promise<Turma | void> {
    return await this.repository.create(turma)
  }
}
