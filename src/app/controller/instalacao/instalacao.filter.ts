import { GenericFilter } from './../../generics/generic.filter';

export class InstalacaoFilter extends GenericFilter {
    private nome: string;

    public getNome() {
        return this.nome;
    }
    
    public setNome(nome: string) {
        this.nome = nome;
    }
}