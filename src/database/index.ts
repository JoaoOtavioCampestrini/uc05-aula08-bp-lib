import pgp from "pg-promise";

const connectionString =
  "postgres://postgres:password@localhost:5432/matriculas_db";

export class Database {
  private connection: any;

  constructor() {
    try {
      this.connection = pgp()(connectionString);
      console.log("Conexão com o banco de dados feita com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  one(statement: string, params: any) {
    return this.connection.one(statement, params);
  }

  closeConnection(): Promise<any> {
    return this.connection.$pool.end();
  }
}
