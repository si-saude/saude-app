import { GenericFilter } from './../../generics/generic.filter';

export class EquipeFilter extends GenericFilter {
    private nome: string;
    private abreviacao: string;

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
    public getAbreviacao() {
        return this.abreviacao;
    }
    
    public setAbreviacao(abreviacao: string) {
        this.abreviacao = abreviacao;
    }
    
}