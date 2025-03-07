import Scanner from "@codeea/scanner";
import pgp from 'pg-promise';

console.log("Olá mundo");

const scanner = new Scanner();

//criar um objeto de conexão com o banco
const connectionString = "postgres://postgres:password@localhost:5432/matriculas_db";

const connection = pgp()(connectionString);
const results = await connection.query("Select * from alunos");


scanner.close();
