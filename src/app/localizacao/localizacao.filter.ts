import { GenericFilter } from './../generics/generic.filter';

export class LocalizacaoFilter extends GenericFilter {
    private nome: string;

    constructor() {
        super();
    }

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
}