import Scanner from "@codeea/scanner";
import { Database } from "./database";

const scanner = new Scanner();
const database = new Database();

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
      13 - Excluir Aluno\n
      `);
    comando = await scanner.questionInt("Informe o comando:");
    switch (comando) {
      case 10:
        await createAluno();
        break;

      default:
        break;
    }
  } while (comando > 0);
}

async function createAluno() {
  try {
    // Usando o scanner, vamos obter os dados do aluno para inserir

    // ENTRADA
    console.log("A seguir, informe os dados do aluno: \n");
    const nome = await scanner.question("Nome Completo: ");
    const dataNascimento = await scanner.question(
      "Data Nascimento (ex: 12/11/1990): "
    );
    const cpf = await scanner.question("CPF: ");
    const telefone = await scanner.question("Telefone: ");
    const sexo = await scanner.question("Sexo (M-Masculino/F-Feminino): ");
    const email = await scanner.question("Email: ");
    const escolaridade = await scanner.question("Nível Escolaridade: ");
    const renda = await scanner.questionFloat("Renda: ");
    const pcd = await scanner.question("É PCD? (S-Sim/N-Não): ");

    // Monta a query de inserção
    const queryInsertAlunos = `
      insert into alunos (nome, data_nascimento, cpf,
        telefone, sexo, email, escolaridade, renda, pcd)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    // PROCESSAMENTO

    const [dia, mes, ano] = dataNascimento.split("/");
    const dataNascimentoISO = new Date(`${mes}/${dia}/${ano}`).toUTCString();
    // Insere os dados no banco
    await database.query(queryInsertAlunos, [
      nome,
      dataNascimentoISO,
      cpf,
      telefone,
      sexo.charAt(0),
      email,
      escolaridade,
      renda,
      pcd.toUpperCase() === "S",
    ]);

    // SAÍDA
    // Busca os dados no banco
    const results = await database.query(
      "select id, nome, cpf from alunos",
      []
    );

    // Imprime os dados
    console.log(results);
  } catch (error) {
    // Imprime o erro
    console.log(error);
  }
}

(async () => {
  await main();
  scanner.close();
  await database.closeConnection();
})();
