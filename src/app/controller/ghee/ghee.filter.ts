import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';

export class GheeFilter extends GenericFilter {
 
    private nome: string;
    private codigo: string;
    private dataCriacao: DateFilter;
    private dataDesativacao: DateFilter;
    private descricao: string;
    private descricaoAmbiente: string;
    private descricaoTarefas: string;
    private duracaoJornada: number;
        
    getCodigo():string{
        return this.codigo;
    }
    
    setCodigo(codigo:string){
        this.codigo = codigo;
    }
    
    getNome():string{
        return this.nome;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }
    
    getDataCriacao():DateFilter{
        return this.dataCriacao;
    }
    
    setDataCriacao(dC:DateFilter){
        this.dataCriacao = dC;
    }
    
    getDataDesativacao():DateFilter{
        return this.dataDesativacao;
    }
    
    setDataDesativacao(dD:DateFilter){
        this.dataDesativacao = dD;
    }
    
    getDescricao():string{
        return this.descricao;
    }
    
    setDescricao(descricao:string){
        this.descricao = descricao;
    }
    
    getDescricaoAmbiente():string{
        return this.descricaoAmbiente;
    }
    
    setDescricaoAmbiente(dA:string){
        this.descricaoAmbiente = dA;
    }
    
    getDescricaoTarefas():string{
        return this.descricaoTarefas;
    }
    
    setDescricaoTarefas(dT:string){
        this.descricaoTarefas = dT;
    }
    
    getDuracaoJornada():number{
        return this.duracaoJornada;
    }
    
    setDuracaoJornada(dJ:number){
        this.duracaoJornada = dJ;
    }
}