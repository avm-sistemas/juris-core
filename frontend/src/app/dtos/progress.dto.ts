export class ProgressDto {
    id?: string;
    created?: Date;
    updated?: Date;
    
    descricao: string;
    dataAndamento?: Date;
    statusAtual: string;    
    
    expand?: any;

    constructor() {
        this.statusAtual = '';
        this.descricao = '';
    }
}