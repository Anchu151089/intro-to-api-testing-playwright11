export class LoginDto {
  username: string
  password: string
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
  static createLoginWithCorrectData(): LoginDto {
    return new LoginDto(process.env.USER || '', process.env.PASSWORD || '')
  }

  static createLoginWithInCorrectData(): LoginDto {
    return new LoginDto(process.env.USER1 || '', process.env.PASSWORD1 || '')
  }
}
