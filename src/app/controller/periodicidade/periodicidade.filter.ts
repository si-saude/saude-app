import { GenericFilter } from './../../generics/generic.filter';

export class PeriodicidadeFilter extends GenericFilter {
    private descricao: string;
    private meses: number;

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(descricao: string) {
        this.descricao = t;
    }
    
    public getMeses():number{
        return this.meses;
    }
    
    public setMeses(meses:number){
        this.meses = meses;
    }
}