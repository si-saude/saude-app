import { GenericFilter } from './../../generics/generic.filter';
import { EmpresaFilter } from './../empresa/empresa.filter';

export class CnaeFilter extends GenericFilter {
    private codigo: string;
    private empresa: EmpresaFilter;
    
    constructor() {
        super();
    }

    public getCodigo() {
        return this.codigo;
    }
    
    public setCodigo(c: string) {
        this.codigo = c;
    }
    
    public getEmpresa() {
        return this.empresa;
    }
    
    public setEmpresa(empresa: EmpresaFilter) {
        this.empresa = empresa;
    }
       
}