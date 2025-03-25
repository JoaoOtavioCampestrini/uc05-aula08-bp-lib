type AlunoMatricula = {
  id: number;
  nome_aluno: string;
  data_nascimento: Date;
  cpf: string;
};

type TurmaMatricula = {
  id: number;
  codigo_turma: string;
  data_inicio: Date;
};

export type CreateMatriculaResponseDto = {
  id: number;
  aluno: AlunoMatricula;
  turma: TurmaMatricula;
  ativo: boolean;
};
