import { EixoFilter } from './../eixo/eixo.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class DiagnosticoFilter extends GenericFilter {
    private codigo: string;
    private descricao: string;
    private inativo: BooleanFilter = new BooleanFilter();
    private eixo: EixoFilter;
    
    getCodigo() {
        return this.codigo;
    }
    setCodigo(codigo: string) {
        this.codigo = codigo;
    }
    getDescricao() {
        return this.descricao;
    }
    setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    getInativo() {
        return this.inativo;
    }
    setInativo(inativo: BooleanFilter) {
        this.inativo = inativo;
    }
    getEixo() {
        return this.eixo;
    }
    setEixo(eixo: EixoFilter) {
        this.eixo = eixo;
    }
        
}