export type Curso = {
  id?: number;
  nome: string;
  carga_horaria: number;
  valor: number;
  conteudo: string;
  codigo_curso: string;
  data_publicado: Date;
  area_conhecimento: string;
  ativo: boolean;
}
