import { AlunoRepository } from "../aluno/aluno.repository";
import { UserError } from "../shared/error/user.error";
import { Matricula } from "../shared/model/matricula.model";
import { TurmaRepository } from "../turma/turma.repository";
import { CreateMatriculaResponseDto } from "./dto/create-matricula-response.dto";
import { MatriculaRepository } from "./matricula.repository";

export class MatriculaService {
  private matriculaRepository: MatriculaRepository;
  private alunoRepository: AlunoRepository;
  private turmaRepository: TurmaRepository;

  constructor(
    matriculaRepository: MatriculaRepository,
    alunoRepository: AlunoRepository,
    turmaRepository: TurmaRepository
  ) {
    this.matriculaRepository = matriculaRepository;
    this.alunoRepository = alunoRepository;
    this.turmaRepository = turmaRepository;
  }

  async create(matricula: Matricula): Promise<Matricula | void> {
    // validar se o aluno existe
    const aluno = await this.alunoRepository.getById(matricula.aluno_id);
    if (!aluno) {
      throw new UserError("Aluno não encontrado.");
    }

    // validar se a turma existe
    const turma = await this.turmaRepository.getById(matricula.turma_id);
    if (!turma) {
      throw new UserError("Turma não encontrada.");
    }

    return this.matriculaRepository.create(matricula);
  }

  async getById(id: number): Promise<CreateMatriculaResponseDto | undefined> {
    return this.matriculaRepository.getMatriculaWithAlunoAndTurma(id);
  }
}
