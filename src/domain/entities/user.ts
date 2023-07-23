class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public age: number,
    public password: string,
    public isAdmin: boolean,
    public role: string,
    public cart: string[]
  ) {}
}

export default User;
