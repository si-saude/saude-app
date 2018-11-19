import { BooleanFilter } from './../../generics/boolean.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class ServicoFilter extends GenericFilter {
    private nome: string;
    private codigo: string;
    private grupo: string;
    private intervalo: number;
    private quantidadeSolicitacaoIntervalo: number;
    private publico: BooleanFilter = new BooleanFilter();
    private inativo: BooleanFilter = new BooleanFilter();
    
    getNome() {
        return this.nome;
    }

    setNome(nome: string) {
        this.nome = nome;
    }
    
    getCodigo() {
        return this.codigo;
    }
    
    setCodigo(codigo: string) {
        this.codigo = codigo;
    }
    
    getGrupo() {
        return this.grupo;
    }
    
    setGrupo(grupo: string) {
        this.grupo = grupo;
    }
    
    getPublico() {
        return this.publico;
    }
    
    setPublico(publico: BooleanFilter) {
        this.publico = publico;
    }
    
    getInativo() {
        return this.inativo;
    }
    
    setInativo(inativo: BooleanFilter) {
        this.inativo = inativo;
    }
    
    setIntervalo(intervalo: number) {
        this.intervalo = intervalo;
    }
    
    getQuantidadeSolicitacaoIntervalo() {
        return this.quantidadeSolicitacaoIntervalo;
    }
    
    setQuantidadeSolicitacaoIntervalo(quantidadeSolicitacaoIntervalo: number) {
        this.quantidadeSolicitacaoIntervalo = quantidadeSolicitacaoIntervalo;
    }
    
}
