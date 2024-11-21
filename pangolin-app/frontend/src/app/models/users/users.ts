export class Users {
    constructor(user_id: number,
                email: string,
                pass_hash: string,
                salt: string,
                role: string
    ){
        this.user_id = user_id;
        this.email = email;
        this.pass_hash = pass_hash;
        this.salt = salt;
        this.role = role;
    }
    user_id: number;
    email: string;
    pass_hash: string;
    salt: string;
    role: string;
}
