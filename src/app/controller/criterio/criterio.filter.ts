import { GenericFilter } from './../../generics/generic.filter';

export class CriterioFilter extends GenericFilter {
    private nome: string;
    private operador: string;
    private tipo: string = "";
    private valor: string;

    getNome(): string {
        return this.nome;
    }
    
    setNome(nome: string) {
        this.nome = nome;
    }
    
    getOperador(): string {
        return this.operador;
    }
    
    setOperador(operador: string) {
        this.operador = operador;
    }
    
    getTipo():string{
        return this.tipo;
    }
    
    setTipo(tipo: string){
        this.tipo = tipo;
    }
    
    getValor():string{
        return this.valor;
    }
    
    setValor(valor: string){
        this.valor = valor;
    }
}