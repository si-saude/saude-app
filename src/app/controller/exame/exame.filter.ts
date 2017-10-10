import { GenericFilter } from './../../generics/generic.filter';

export class ExameFilter extends GenericFilter {
    private codigo: string;
    private descricao: string;

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
}