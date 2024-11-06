export class ProcessDto {
    id?: string;
    created?: Date;
    updated?: Date;

    numero: string;
    status: string;
    descricao: string;
    tipo: string;

    cliente?: any;
    andamentos?: any[];
    partes_envolvidas?: any[];
    anexos?: any[];
    advogados?: any[];

    expand?: any;

    constructor() {
        this.numero = '';
        this.status = '';
        this.descricao = '';
        this.tipo = '';

        this.andamentos = [];
        this.partes_envolvidas = [];
        this.anexos = [];
        this.advogados = [];
    }
}