export class LawyerDto {
    id?: string;
    created?: Date;
    updated?: Date;

    nome: string;
    oab: string;
    telefone: string;
    email: string;

    processos?: any[];

    constructor() {
        this.nome = '';
        this.oab = '';
        this.telefone = '';
        this.email = '';
        this.processos = [];
    }
}