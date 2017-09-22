import { GenericFilter } from './../../generics/generic.filter';

export class GerenciaFilter extends GenericFilter {
    private codigo: string;
    private codigoCompleto: string;
    private descricao: string;

    constructor() {
        super();
    }

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
    
}