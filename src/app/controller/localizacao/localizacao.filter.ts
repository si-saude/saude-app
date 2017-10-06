import { GenericFilter } from './../../generics/generic.filter';

export class LocalizacaoFilter extends GenericFilter {
    private nome: string;

    getNome() {
        return this.nome;
    }
    
    setNome(n: string) {
        this.nome = n;
    }
    
}