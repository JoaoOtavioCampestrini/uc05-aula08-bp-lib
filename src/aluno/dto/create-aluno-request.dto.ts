export type CreateAlunoRequestDto = {
  nome: string;
  dataNascimento: Date;
  cpf: string;
  telefone: string;
  sexo: string;
  email: string;
  escolaridade: string;
  renda: number;
  pcd: boolean;
  senha: string;
};
