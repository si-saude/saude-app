import { GenericFilter } from './../../generics/generic.filter';

export class RequisitoAsoFilter extends GenericFilter {
    private conteudo: string;
   
    constructor() {
        super();
    }

    public getConteudo() {
        return this.conteudo;
    }
    
    public setConteudo(c: string) {
        this.conteudo = c;
    }
}