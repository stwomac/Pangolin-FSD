/*
 * login dto that we use in order to login
* */
export class LoginDto {
  username : string;
  password : string
  constructor(username : string,password : string) {
    this.username = username
    this.password = password;
  }
}

/*
 * response from the server
* */
export interface AuthToken {
  access_token : string;
}
