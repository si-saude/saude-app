import { GenericFilter } from './../../generics/generic.filter';

export class CursoFilter extends GenericFilter {
    private nome: string;
    private descricao: string;
    private validade: number;
    
    constructor() {
        super();
    }

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(d: string) {
        this.descricao = d;
    }
    
    public getValidade() {
        return this.validade;
    }
    
    public setValidade(v: number) {
        this.validade = v;
    }
    
}