export class CustomerDto {
    id?: string;
    created?: Date;
    updated?: Date;
    
    nome: string;
    cpfCnpj: string;
    endereco: string;
    telefone: string;
    email: string;

    processo?: any;

    constructor() {
        this.nome = '';
        this.cpfCnpj = '';
        this.endereco = '';
        this.telefone = '';
        this.email = '';
    }
}