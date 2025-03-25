import { Matricula } from "../shared/model/matricula.model";
import { CreateMatriculaResponseDto } from "./dto/create-matricula-response.dto";

export class MatriculaRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async create(matricula: Matricula): Promise<Matricula> {
    const statementInsert = `
      INSERT INTO public.matriculas
      (aluno_id, turma_id, ativo)
      VALUES($1, $2, $3)
      RETURNING id;
    `;
    const result = await this.database.one(statementInsert, [
      matricula.aluno_id,
      matricula.turma_id,
      true,
    ]);

    return {
      id: result.id,
      ...matricula,
    };
  }

  async getMatriculaWithAlunoAndTurma(
    id: number
  ): Promise<CreateMatriculaResponseDto | undefined> {
    const queryById = `
    select
      m.id,
      a.id as aluno_id,
      a.nome as nome_aluno,
      a.data_nascimento,
      a.cpf,
      t.id as turma_id,
      t.codigo_turma,
      t.data_inicio
    from matriculas m
    left join turmas t
      on (t.id = m.turma_id)
    left join alunos a
      on (a.id = m.aluno_id)
    where m.id = $1;
    `;
    const matricula = await this.database.one(queryById, [id]);
    if (!matricula) return;

    return {
      id: matricula.id,
      aluno: {
        id: matricula.aluno_id,
        nome_aluno: matricula.nome_aluno,
        data_nascimento: matricula.data_nascimento,
        cpf: matricula.cpf,
      },
      turma: {
        id: matricula.turma_id,
        codigo_turma: matricula.codigo_turma,
        data_inicio: matricula.data_inicio,
      },
      ativo: matricula.ativo,
    };
  }
}
