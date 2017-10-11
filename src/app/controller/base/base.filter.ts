import { GenericFilter } from './../../generics/generic.filter';

export class BaseFilter extends GenericFilter {
 
    private nome: string;

    getNome():string{
        return this.nome;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }
}