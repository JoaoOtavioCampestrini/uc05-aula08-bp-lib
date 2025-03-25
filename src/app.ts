import express, { Express, Response } from "express";
import cors from "cors";
import { AlunoRouter } from "./aluno/aluno.router";
import { Database } from "./shared/database";
import { InstrutorRouter } from "./instrutor/instrutor.router";
import { CursoRouter } from "./curso/curso.router";
import { TurmaRouter } from "./turma/turma.router";
import { CursoRepository } from "./curso/curso.repository";
import { CursoService } from "./curso/curso.service";
import { CursoController } from "./curso/curso.controller";
import { AlunoRepository } from "./aluno/aluno.repository";
import { AlunoService } from "./aluno/aluno.service";
import { AlunoController } from "./aluno/aluno.controller";
import { InstrutorRepository } from "./instrutor/instrutor.repository";
import { InstrutorService } from "./instrutor/instrutor.service";
import { InstrutorController } from "./instrutor/instrutor.controller";
import { TurmaRepository } from "./turma/turma.repository";
import { TurmaService } from "./turma/turma.service";
import { TurmaController } from "./turma/turma.controller";
import { MatriculaRepository } from "./matricula/matricula.repository";
import { MatriculaService } from "./matricula/matricula.service";
import { MatriculaController } from "./matricula/matricula.controller";
import { MatriculaRouter } from "./matricula/matricula.router";

class App {
  private readonly PORT = 3000;
  private _app: Express;
  private database: any;
  constructor() {
    this._app = express();
  }

  public configure() {
    // Conecta com o banco de dados
    this.database = new Database();

    // Configura o app para receber e enviar com JSON
    this._app.use(express.json());

    this._app.use(cors());

    // Rotas
    this._app.get("/health", (_, res: Response) => {
      res.send({ status: "OK" });
    });

    // Todas as dependencias do pacote aluno
    const alunoRepository = new AlunoRepository(this.database);
    const alunoService = new AlunoService(alunoRepository);
    const alunoController = new AlunoController(alunoService);

    // Todas as dependencias do pacote curso
    const cursoRepository = new CursoRepository(this.database);
    const cursoService = new CursoService(cursoRepository);
    const cursoController = new CursoController(cursoService);

    // Todas as dependencias do pacote instrutor
    const instrutorRepository = new InstrutorRepository(this.database);
    const instrutorService = new InstrutorService(instrutorRepository);
    const instrutorController = new InstrutorController(instrutorService);

    // Todas as dependencias do pacote turma
    const turmaRepository = new TurmaRepository(this.database);
    const turmaService = new TurmaService(turmaRepository);
    const turmaController = new TurmaController(
      turmaService,
      cursoService,
      instrutorService
    );

    const matriculaRepository = new MatriculaRepository(this.database);
    const matriculaService = new MatriculaService(
      matriculaRepository,
      alunoRepository,
      turmaRepository
    );
    const matriculaController = new MatriculaController(matriculaService);

    const alunoRouter = new AlunoRouter(alunoController);
    const cursoRouter = new CursoRouter(cursoController);
    const instrutorRouter = new InstrutorRouter(instrutorController);
    const turmaRouter = new TurmaRouter(turmaController);
    const matriculaRouter = new MatriculaRouter(matriculaController);

    this._app.use("/alunos", alunoRouter.getRouter());
    this._app.use("/cursos", cursoRouter.getRouter());
    this._app.use("/instrutores", instrutorRouter.getRouter());
    this._app.use("/turmas", turmaRouter.getRouter());
    this._app.use("/matriculas", matriculaRouter.getRouter());
  }

  public start() {
    this._app.listen(this.PORT, (error) => {
      if (error) {
        console.log(error);
      }
      console.log(`Servidor iniciado na porta ${this.PORT}`);
    });
  }

  public async stop() {
    await this.database.closeConnection();
  }
}

export const app = new App();
