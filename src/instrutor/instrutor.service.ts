import { Instrutor } from "../shared/model/instrutor.model";
import { InstrutorRepository } from "./instrutor.repository";

export class InstrutorService {
  private repository: InstrutorRepository;

  constructor(repository: InstrutorRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<Instrutor[]> {
    return this.repository.getAll();
  }

  async create(instrutor: Instrutor): Promise<Instrutor | void> {
    if (!instrutor.cpf) {
      throw new Error("CPF Inválido");
    }
    return await this.repository.create(instrutor)
  }

  async getById(id: number): Promise<Instrutor | null> {
    return await this.repository.getById(id);
  }
}
