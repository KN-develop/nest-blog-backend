export class AuthSession {
  private static _id: number;
  private static _username: string;

  public static setData(id: number, username: string) {
    this._id = id;
    this._username = username;
  }

  static get id() {
    return this._id;
  }

  static get username() {
    return this._username;
  }
}