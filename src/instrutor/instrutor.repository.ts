import { Instrutor } from "../shared/model/instrutor.model";

export class InstrutorRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async create(instrutor: Instrutor): Promise<Instrutor> {
    const statementInsert = `
      INSERT INTO public.instrutores
        (nome, cpf, data_nascimento,
        matricula, sexo, email,
        data_admissao, data_desligamento)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id;
    `;

    const result = await this.database.one(statementInsert, [
      instrutor.nome,
      instrutor.cpf,
      instrutor.data_nascimento,
      instrutor.matricula,
      instrutor.sexo,
      instrutor.email,
      instrutor.data_admissao,
      instrutor.data_desligamento,
    ]);

    return {
      id: result.id,
      ...instrutor,
    };
  }

  async getAll(): Promise<Instrutor[]> {
    const statementSelectAll = `
      SELECT
        id, nome, cpf,
        data_nascimento, matricula, sexo,
        email, data_admissao, data_desligamento
      FROM public.instrutores
    `;
    const result = await this.database.query(statementSelectAll, []);
    if (result.length === 0) {
      return [];
    }
    return result.map((instrutor: Instrutor) => {
      return { ...instrutor };
    });
  }

  async getById(id: number): Promise<Instrutor | null> {
    const statementSelectOne = `
      SELECT
        id, nome, cpf,
        data_nascimento, matricula, sexo,
        email, data_admissao, data_desligamento
      FROM public.instrutores
    WHERE id = $1
    `;
    const [instrutor] = await this.database.query(statementSelectOne, [id]);
    return instrutor || null;
  }
}
