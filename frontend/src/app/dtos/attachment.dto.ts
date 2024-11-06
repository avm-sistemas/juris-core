export class AttachmentDto {
    id?: string;
    created?: Date;
    updated?: Date;

    nome: string;
    descricao: string;
    conteudo: string;
    mime: string;

    processo?: any;

    constructor() {
        this.nome = '';
        this.descricao = '';
        this.conteudo = '';
        this.mime = '';
    }
}