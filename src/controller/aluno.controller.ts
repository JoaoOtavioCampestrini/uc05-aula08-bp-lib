import Scanner from "@codeea/scanner";
import { Aluno } from "../model/aluno";
import { AlunoService } from "../service/aluno.service";

export class AlunoController {
  private scanner: Scanner;
  private service: AlunoService;

  constructor(service: AlunoService) {
    this.scanner = new Scanner();
    this.service = service;
  }

  private async inputDataAluno(): Promise<Aluno> {
    const nome = await this.scanner.question("Nome Completo: ");
    const dataNascimento = await this.scanner.question(
      "Data Nascimento (ex: 12/11/1990): "
    );
    const cpf = await this.scanner.question("CPF: ");
    const telefone = await this.scanner.question("Telefone: ");
    const sexo = await this.scanner.question("Sexo (M-Masculino/F-Feminino): ");
    const email = await this.scanner.question("Email: ");
    const escolaridade = await this.scanner.question("Nível Escolaridade: ");
    const renda = await this.scanner.questionFloat("Renda: ");
    const pcd = await this.scanner.question("É PCD? (S-Sim/N-Não): ");

    const [dia, mes, ano] = dataNascimento.split("/");

    return {
      nome,
      dataNascimento: new Date(`${mes}/${dia}/${ano}`),
      cpf,
      telefone,
      sexo: sexo.charAt(0),
      email,
      escolaridade,
      renda,
      pcd: pcd.toUpperCase() === "S",
    };
  }

  // CRUD - (C)reate
  async createAluno() {
    try {
      // Usando o scanner, vamos obter os dados do aluno para inserir

      // ENTRADA
      console.log("A seguir, informe os dados do aluno: \n");
      const aluno = await this.inputDataAluno();

      // PROCESSAMENTO
      // TODO
      const novoAluno = await this.service.createAluno(aluno);

      // SAÍDA
      console.log(novoAluno);
    } catch (error) {
      // Imprime o erro
      console.log(error);
    }
  }

  // CRUD - (R)etrieve
  // async getAlunos() {
  //   // Busca os dados no banco
  //   // TODO
  //   const results = await alunoRepository.getAll();

  //   // Imprime os dados
  //   console.log(results);
  // }

  // async getAlunoById(id: Number): Promise<any> {
  //   // Busca os dados no banco
  //   // TODO
  //   const results = await database.query("select * from alunos where id = $1", [
  //     id,
  //   ]);

  //   // Imprime os dados
  //   console.log(results);
  // }

  // // CRUD - (U)pdate
  // async updateAluno() {
  //   try {
  //     // Usando o scanner, vamos obter os dados do aluno para inserir

  //     // ENTRADA
  //     console.log("A seguir, informe os dados do aluno a ser atualizado: \n");
  //     const id = await this.scanner.questionInt("Informe o id do aluno: ");
  //     if (!id) {
  //       console.log("Informe o ID do aluno");
  //       return;
  //     }

  //     const aluno = await this.inputDataAluno();

  //     // Monta a query de inserção
  //     const statementUpdateAlunos = `
  //       update alunos set
  //         nome = $1,
  //         data_nascimento = $2,
  //         cpf = $3,
  //         telefone = $4,
  //         sexo = $5,
  //         email = $6,
  //         escolaridade = $7,
  //         renda = $8,
  //         pcd = $9
  //       where id = $10
  //     `;

  //     // PROCESSAMENTO

  //     // Insere os dados no banco
  //     // TODO
  //     await database.query(statementUpdateAlunos, [
  //       aluno.nome,
  //       aluno.dataNascimento,
  //       aluno.cpf,
  //       aluno.telefone,
  //       aluno.sexo,
  //       aluno.email,
  //       aluno.escolaridade,
  //       aluno.renda,
  //       aluno.pcd,
  //       id,
  //     ]);

  //     // SAÍDA
  //     // TODO
  //     const alunoAtualizado = await getAlunoById(id);
  //     console.log(alunoAtualizado);
  //   } catch (error) {
  //     // Imprime o erro
  //     console.log(error);
  //   }
  // }

  // async deleteAluno(): Promise<void> {
  //   try {
  //     console.log("A seguir, informe os dados do aluno a ser excluído: \n");
  //     const id = await this.scanner.questionInt("Informe o id do aluno: ");
  //     if (!id) {
  //       console.log("Informe o ID do aluno");
  //       return;
  //     }
  //     // Monta a query de exclusão
  //     const statementDeleteAlunos = `
  //       delete from alunos where id = $1
  //     `;
  //     await database.query(statementDeleteAlunos, [id]);
  //   } catch (error) {
  //     // Imprime o erro
  //     console.log(error);
  //   }
  // }
}
