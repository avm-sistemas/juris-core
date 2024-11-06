export class PartiesInvolvedDto {
    id?: string;
    created?: Date;
    updated?: Date;

    nome: string;

    expand?: any;

    constructor() {
        this.nome = '';
    }
}