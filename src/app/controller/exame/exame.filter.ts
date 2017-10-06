import { GenericFilter } from './../../generics/generic.filter';

import { EmpregadoFilter } from './../empregado/empregado.filter';

export class ExameFilter extends GenericFilter {
    private codigo: string;
    private descricao: string;
    private empregado: EmpregadoFilter;

    getCodigo() {
        return this.codigo;
    }
    
    setCodigo(codigo: string) {
        this.codigo = codigo;
    }
    
    getDescricao() {
        return this.codigo;
    }
    
    setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    
    getEmpregado() {
        return this.empregado;
    }
    
    setEmpregado(empregado: EmpregadoFilter) {
        this.empregado = empregado;
    }
    
}