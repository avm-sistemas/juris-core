import { IPocketBaseAuth } from "../interfaces/ipocket-base-auth.interface";

export class PocketBaseAuth implements IPocketBaseAuth {
    model: any;
    token?: string;

    constructor() {
        this.token = '';
    }
}