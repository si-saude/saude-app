import { Empresa } from '../../model/empresa';
import { GenericBuilder } from '../../generics/generic.builder';

export class EmpresaBuilder extends GenericBuilder {

    initialize(empresa: Empresa) {
        empresa = new Empresa();
        return empresa;
    }
    
    initializeList(empresas: Array<Empresa>) {
        
        let array:Array<Empresa> = new Array<Empresa>();
        
        if(empresas === null || empresas === undefined)
            empresas = new Array<Empresa>();
        
        for (let empresa of empresas) {
            array.push(this.initialize(empresa));
        }
        
        return array;
    }
    
    clone(empresa: Empresa): Empresa {
        
        if (empresa === null || empresa === undefined)
            empresa = new Empresa();
        
        let cloneEmpresa = new Empresa();
        cloneEmpresa.setId(this.getValue(empresa,"getId"));
        cloneEmpresa.setNome(this.getValue(empresa, "getNome"));
        cloneEmpresa.setVersion(this.getValue(empresa, "getVersion"));
        return cloneEmpresa;
    }
    
    cloneList(empresas: Array<Empresa>): Array<Empresa> {
        let array:Array<Empresa> = new Array<Empresa>();
        if (empresas !== null && empresas !== undefined) { 
            for (let empresa of empresas) {
                array.push(this.clone(empresa));
            }
        }
        
        return array;
    }
    
}