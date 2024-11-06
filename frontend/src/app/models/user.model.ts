import { IUser } from "../interfaces/iuser.interface";

export class User implements IUser {
    username: string;
    email: string;
    emailVisibility: boolean;
    password: string;
    passwordConfirm: string;
    name: string;
    
    constructor() {
        this.username = '';
        this.email = '';
        this.emailVisibility = true;
        this.password = '';
        this.passwordConfirm = '';
        this.name = '';        
        
    }
}