import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class ProfissiogramaFilter extends GenericFilter {
    private nome:string;
    private vinculo: string;
    private concluido: BooleanFilter = new BooleanFilter();

    getNome():string{
        return this.nome;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }
    
    getVinculo(): string{
        return this.vinculo;
    }
    
    setVinculo(vinculo: string){
        this.vinculo = vinculo;
    }
          
    getConcluido():BooleanFilter{
        return this.concluido;
    }
    
    setConcluido(concluido: BooleanFilter){
        this.concluido = concluido;
    }
}