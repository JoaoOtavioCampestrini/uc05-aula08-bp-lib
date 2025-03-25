
export class UserError extends Error {
  status: number;
  constructor(message: string, status: number = 400) {
    super(message);
    this.name = "UserError";
    this.status = status;
  }
}
