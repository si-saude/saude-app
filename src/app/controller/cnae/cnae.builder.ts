import { Cnae } from './../../model/cnae';
import { EmpresaBuilder } from './../empresa/empresa.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class CnaeBuilder extends GenericBuilder {
    
    initialize(cnae: Cnae) {
        cnae = new Cnae();
        cnae.setEmpresa(new EmpresaBuilder().initialize(cnae.getEmpresa()));
        return cnae;
    }
    
    initializeList(cnaes: Array<Cnae>) {
        
        let array:Array<Cnae> = new Array<Cnae>();
        
        if(cnaes === null || cnaes === undefined)
            cnaes = new Array<Cnae>();
        
        for (let cnae of cnaes) {
            array.push(this.initialize(cnae));
        }
        
        return array;
    }
    
    clone(cnae: Cnae) {
        
        if (cnae === null || cnae === undefined)
            cnae = new Cnae();
        
        let cloneCnae = new Cnae();
        cloneCnae.setId(this.getValue(cnae,"getId"));
        cloneCnae.setVersion(this.getValue(cnae,"getVersion"));
        cloneCnae.setCodigo(this.getValue(cnae,"getCodigo"));
        
        cloneCnae.setEmpresa(new EmpresaBuilder().clone(this.getValue(cnae,"getEmpresa")));
        
        return cloneCnae;
    }
    
    cloneList(cnaes: Array<Cnae>): Array<Cnae> {
        let array:Array<Cnae> = new Array<Cnae>();
        if (cnaes !== null && cnaes !== undefined) { 
            for (let cnae of cnaes) {
                array.push(this.clone(cnae));
            }
        }
        
        return array;
    }
    
}