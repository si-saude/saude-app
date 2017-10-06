import { GenericFilter } from './../../generics/generic.filter';

export class VacinaFilter extends GenericFilter {
    private descricao: string;
    private doses: number;
    private reforco: number;

    getDescricao() {
        return this.descricao;
    }
    
    setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    
    getDoses() {
        return this.doses;
    }
    
    setDoses(doses: number) {
        this.doses = doses;
    }
    
    getReforco() {
        return this.reforco;
    }
    
    setReforco(reforco: number) {
        this.reforco = reforco;
    }
    
}