import { GenericFilter } from './../../generics/generic.filter';

export class CriterioFilter extends GenericFilter {
    private nome: string;
    private tipo: string;

    getNome(): string {
        return this.nome;
    }
    
    setNome(nome: string) {
        this.nome = nome;
    }
    
    getTipo():string{
        return this.tipo;
    }
    
    setTipo(tipo: string){
        this.tipo = tipo;
    }
}