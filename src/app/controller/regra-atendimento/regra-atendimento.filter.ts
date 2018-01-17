import { GenericFilter } from './../../generics/generic.filter';

export class RegraAtendimentoFilter extends GenericFilter {
    private nome: string;

    getNome() {
        return this.nome;
    }

    setNome(nome: string) {
        this.nome = nome;
    }
}
