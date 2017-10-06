import { GenericFilter } from './../../generics/generic.filter';

export class EquipeFilter extends GenericFilter {
    private nome: string;

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
}