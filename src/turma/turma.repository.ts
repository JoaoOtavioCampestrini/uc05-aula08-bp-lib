import { Turma } from "../shared/model/turma.model";

export class TurmaRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async create(turma: Turma): Promise<Turma> {
    const statementInsert = `
      INSERT INTO public.turmas (
        codigo_turma, carga_horaria, valor,
        vagas, data_inicio, curso_id, instrutor_id
      )
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;
    const result = await this.database.one(statementInsert, [
      turma.codigo_turma,
      turma.carga_horaria,
      turma.valor,
      turma.vagas,
      turma.data_inicio,
      turma.curso_id,
      turma.instrutor_id,
    ]);

    return {
      id: result.id,
      codigo_turma: turma.codigo_turma,
      carga_horaria: turma.carga_horaria,
      valor: turma.valor,
      vagas: turma.vagas,
      data_inicio: turma.data_inicio,
      curso_id: turma.curso_id,
      instrutor_id: turma.instrutor_id,
    };
  }

  async getAll(): Promise<Turma[]> {
    return [] as Turma[];
  }

  async getById(id: number): Promise<Turma | undefined> {
    const [turma] = await this.database.query(
      `select codigo_turma, carga_horaria, valor,
        vagas, data_inicio, curso_id, instrutor_id
         from turmas
         where id = $1`,
      [id]
    );
    if (!turma) return;
    return {
      id,
      codigo_turma: turma.codigo_turma,
      carga_horaria: turma.carga_horaria,
      valor: turma.valor,
      vagas: turma.vagas,
      data_inicio: turma.data_inicio,
      curso_id: turma.curso_id,
      instrutor_id: turma.instrutor_id,
    };
  }
}
