import { Curso } from "../shared/model/curso.model";

export class CursoRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async create(curso: Curso): Promise<Curso> {
    const statementInsert = `
      INSERT INTO public.cursos
        (nome, carga_horaria,
        valor, conteudo, codigo_curso,
        data_publicado, area_conhecimento, ativo)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;
    `;
    const result = await this.database.one(statementInsert, [
      curso.nome,
      curso.carga_horaria,
      curso.valor,
      curso.conteudo,
      curso.codigo_curso,
      curso.data_publicado,
      curso.area_conhecimento,
      true,
    ]);

    return {
      id: result.id,
      nome: curso.nome,
      carga_horaria: curso.carga_horaria,
      valor: curso.valor,
      conteudo: curso.conteudo,
      codigo_curso: curso.codigo_curso,
      data_publicado: curso.data_publicado,
      area_conhecimento: curso.area_conhecimento,
      ativo: true,
    };
  }

  async getAll(): Promise<Curso[]> {
    const statementSelectAll = `
      SELECT
        id, nome, carga_horaria,
        valor, conteudo, codigo_curso,
        data_publicado, area_conhecimento, ativo
      FROM public.cursos
    `;
    const result = await this.database.query(statementSelectAll, []);
    if (result.length === 0) {
      return [];
    }
    return result.map((curso: Curso) => {
      return { ...curso };
    });
  }

  async getById(id: number): Promise<Curso | null> {
    const statementSelectOne = `
      SELECT
        id, nome, carga_horaria,
        valor, conteudo, codigo_curso,
        data_publicado, area_conhecimento, ativo
      FROM public.cursos
      WHERE id = $1
    `;
    const [curso] = await this.database.query(statementSelectOne, [id]);
    return curso || null;
  }
}
