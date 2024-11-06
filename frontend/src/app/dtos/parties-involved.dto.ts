export class PartiesInvolvedDto {
    id?: string;
    created?: Date;
    updated?: Date;

    nome: string;

    processo?: any;

    constructor() {
        this.nome = '';
    }
}