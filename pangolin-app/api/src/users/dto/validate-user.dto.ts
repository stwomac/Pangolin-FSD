/*
 * this class represents the data required to validate a user for authentication,
 *
 * note that this is VERY similar to the CreateUserDto as validation data is 
 * needed in order to create an account, however for future expansion having this as
 * a seperate dto allows us to add more properties to the create user dto like phone number
 * or non essential objects
* */
export class ValidateUserDto {
   username : string; //mapps over to email on CreatUserDto
   password : string;
}
