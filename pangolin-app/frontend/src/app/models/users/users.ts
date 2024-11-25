export class Users {
  constructor(
    public user_id: number,
    public email: string,
    public pass_hash: string,
    public salt: string,
    public role: string,
  ) {}
}
