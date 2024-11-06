export class AttachmentDto {
    id?: string;
    created?: Date;
    updated?: Date;

    nome: string;
    descricao: string;
    conteudo: string;
    mime: string;
    tamanho: number;

    processo?: any;

    constructor() {
        this.nome = '';
        this.descricao = '';
        this.conteudo = '';
        this.mime = '';
        this.tamanho = 0;
    }
}