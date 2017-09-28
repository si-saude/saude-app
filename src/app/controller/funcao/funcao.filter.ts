import { GenericFilter } from './../../generics/generic.filter';

export class FuncaoFilter extends GenericFilter {
    private nome: string;
    private cursoObrigatorio: string;
    
    constructor() {
        super();
    }

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
    public getCursoObrigatorio() {
        return this.cursoObrigatorio;
    }
    
    public setCursoObrigatorio(co: string) {
        this.cursoObrigatorio = co;
    }
    
}