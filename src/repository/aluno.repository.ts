import { Aluno } from "../model/aluno";

export class AlunoRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async createAluno(aluno: Aluno): Promise<Aluno> {
    const queryInsertAlunos = `
      insert into alunos (nome, data_nascimento, cpf,
        telefone, sexo, email, escolaridade, renda, pcd)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
    `;

    const result = await this.database.one(queryInsertAlunos, [
      aluno.nome,
      aluno.dataNascimento,
      aluno.cpf,
      aluno.telefone,
      aluno.sexo,
      aluno.email,
      aluno.escolaridade,
      aluno.renda,
      aluno.pcd,
    ]);

    return {
      id: result.id,
      ...aluno,
    };
  }

  async getAll(): Promise<[]> {
    return await this.database.query("select id, nome, cpf from alunos", []);
  }
}
