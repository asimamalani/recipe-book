export class User {
  constructor(
    public email: string,
    public userid: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  public get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
