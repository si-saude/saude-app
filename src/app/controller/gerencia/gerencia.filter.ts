import { GenericFilter } from './../../generics/generic.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class GerenciaFilter extends GenericFilter {
    private codigo: string;
    private codigoCompleto: string;
    private descricao: string;
    private gerente: EmpregadoFilter;
    private secretario1: EmpregadoFilter;
    private secretario2: EmpregadoFilter;
    private ausentePeriodico: BooleanFilter = new BooleanFilter();

    public getCodigo() {
        return this.codigo;
    }
    
    public setCodigo(c: string) {
        this.codigo = c;
    }
    
    public getCodigoCompleto() {
        return this.codigoCompleto;
    }
    
    public setCodigoCompleto(cc: string) {
        this.codigoCompleto = cc;
    }
    
    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(d: string) {
        this.descricao = d;
    }
    
    public getGerente():EmpregadoFilter{
        return this.gerente;
    }
    
    public setGerente(g:EmpregadoFilter){
        this.gerente = g;
    }
    
    public getSecretario1():EmpregadoFilter{
        return this.secretario1;
    }
    
    public setSecretario1(s:EmpregadoFilter){
        this.secretario1 = s;
    }
    
    public getSecretario2():EmpregadoFilter{
        return this.secretario2;
    }
    
    public setSecretario2(s:EmpregadoFilter){
        this.secretario2 = s;
    }
    
    public getAusentePeriodico():BooleanFilter{
        return this.ausentePeriodico;
    }
    
    public setAusentePeriodico(ausentePeriodico:BooleanFilter){
        this.ausentePeriodico = ausentePeriodico;
    }
}