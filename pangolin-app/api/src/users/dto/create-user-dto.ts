/*
 * this class contains the information required to create a new user into the system
 * */
export class CreateUserDto {
   constructor(email : string,password : string) {
      this.email = email;
      this.password = password;
   }
   email : string;
   //plain text password that will be hashed later
   password : string;
}
