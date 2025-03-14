import { Aluno } from "../shared/model/aluno";

export class AlunoRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async create(aluno: Aluno): Promise<Aluno> {
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

  async getAll(): Promise<Aluno[]> {
    const result = await this.database.query(
      `select nome, data_nascimento, cpf,
           telefone, sexo, email, escolaridade,
           renda, pcd
       from alunos`,
      []
    );
    if (result.length === 0) {
      return [];
    }
    return result.map((aluno: any) => ({
      id: aluno.id,
      nome: aluno.nome,
      dataNascimento: aluno.data_nascimento,
      cpf: aluno.cpf,
      telefone: aluno.telefone,
      sexo: aluno.sexo,
      email: aluno.email,
      escolaridade: aluno.escolaridade,
      renda: aluno.renda,
      pcd: aluno.pcd,
    }));
  }

  async getById(id: number): Promise<Aluno | undefined> {
    const [result] = await this.database.query(
      `select nome, data_nascimento, cpf,
           telefone, sexo, email, escolaridade,
           renda, pcd
       from alunos
       where id = $1`,
      [id]
    );
    if (!result) return;
    return {
      id,
      nome: result.nome,
      dataNascimento: result.data_nascimento,
      cpf: result.cpf,
      telefone: result.telefone,
      sexo: result.sexo,
      email: result.email,
      escolaridade: result.escolaridade,
      renda: result.renda,
      pcd: result.pcd,
    };
  }

  async updateAluno(id: number, aluno: Aluno): Promise<void> {
    try {
      // Monta a query de update
      const statementUpdateAluno = `
        update alunos set
          nome = $1,
          data_nascimento = $2,
          cpf = $3,
          telefone = $4,
          sexo = $5,
          email = $6,
          escolaridade = $7,
          renda = $8,
          pcd = $9
        where id = $10
      `;
      await this.database.query(statementUpdateAluno, [
        aluno.nome,
        aluno.dataNascimento,
        aluno.cpf,
        aluno.telefone,
        aluno.sexo,
        aluno.email,
        aluno.escolaridade,
        aluno.renda,
        aluno.pcd,
        id,
      ]);
    } catch (error) {
      throw error;
    }
  }

  async updatePartOfAluno(id: number, aluno: Aluno): Promise<void> {
    try {
      // Obter os dados do aluno do banco
      const saved = await this.getById(id);
      if (!saved) {
        throw new Error("Aluno não encontrado");
      }

      let alunoParams: Aluno = {} as Aluno;

      // Nome
      alunoParams.nome = saved.nome !== aluno.nome ? aluno.nome : saved.nome;
      // DataNascimento
      alunoParams.dataNascimento =
        saved.dataNascimento !== aluno.dataNascimento
          ? aluno.dataNascimento
          : saved.dataNascimento;
      // CPF
      alunoParams.cpf = saved.cpf !== aluno.cpf ? aluno.cpf : saved.cpf;
      // Telefone
      aluno.telefone =
        saved.telefone !== aluno.telefone ? aluno.telefone : saved.telefone;
      // Sexo
      alunoParams.sexo = saved.sexo !== aluno.sexo ? aluno.sexo : saved.sexo;
      // Email
      alunoParams.email =
        saved.email !== aluno.email ? aluno.email : saved.email;
      // Escolaridade
      alunoParams.escolaridade =
        saved.escolaridade !== aluno.escolaridade
          ? aluno.escolaridade
          : saved.escolaridade;
      // Renda
      alunoParams.renda =
        saved.renda !== aluno.renda ? aluno.renda : saved.renda;
      // PCD
      alunoParams.pcd = saved.pcd !== aluno.pcd ? aluno.pcd : saved.pcd;

      this.updateAluno(id, alunoParams);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    const aluno = await this.getById(id);

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }
    // Monta a query de exclusão
    const statementDeleteAlunos = `delete from alunos where id = $1`;
    await this.database.query(statementDeleteAlunos, [id]);
  }
}
