import Scanner from "@codeea/scanner";
import { Database } from "./database";
import { AlunoRepository } from "./repository/aluno.repository";
import { AlunoService } from "./service/aluno.service";
import { AlunoController } from "./controller/aluno.controller";


const scanner = new Scanner();
const database = new Database();
const alunoRepository = new AlunoRepository(database);
const alunoService = new AlunoService(alunoRepository);
const alunoController = new AlunoController(alunoService);

async function main() {
  // CRUD
  // (C)reate - Criar -> INSERT
  // (R)etrieve - Obter -> SELECT
  // (U)pdate - Atualizar -> UPDATE WITH WHERE
  // (D)elete - Excluir -> DELETE WITH WHERE

  let comando = 0;
  do {
    // 10 - Tabela Alunos
    // 20 - Tabela Instrutores
    // 30 - Tabela Cursos
    // 40 - Tabela Turmas
    // 50 - Tabela Matriculas
    console.log(`
      Comandos Disponíveis:
      10 - Criar Aluno
      11 - Listar Alunos
      12 - Atualizar Dados Aluno
      14 - Excluir Aluno\n

      0-Sair\n
      `);
    comando = await scanner.questionInt("Informe o comando:");
    switch (comando) {
      case 10:
        await alunoController.createAluno();
        break;
      // case 11:
      //   await getAlunos();
      //   break;
      // case 12:
      //   await updateAluno();
      //   break;
      case 13:
        console.log("Opção Inválida");
        break;
      // case 14:
      //   await deleteAluno();
      //   break;
      default:
        break;
    }
  } while (comando > 0);
}



(async () => {
  await main();
  scanner.close();
  await database.closeConnection();
})();
