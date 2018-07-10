import { AprhoEmpregado } from './../../model/aprho-empregado';
import { Empregado } from './../../model/empregado';
import { Aprho } from './../../model/aprho';

import { GenericBuilder } from './../../generics/generic.builder';
import { AprhoBuilder } from './../aprho/aprho.builder';
import { EmpregadoBuilder } from './../empregado/empregado.builder';


export class AprhoEmpregadoBuilder extends GenericBuilder {

    initialize(aprhoEmpregado: AprhoEmpregado) {
        aprhoEmpregado = new AprhoEmpregado();
        aprhoEmpregado.setAprho(new AprhoBuilder().initialize(new Aprho()));
        aprhoEmpregado.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        return aprhoEmpregado;
    }
    
    clone(aprhoEmpregado: AprhoEmpregado): AprhoEmpregado {
        
        if (aprhoEmpregado === null || aprhoEmpregado === undefined)
            aprhoEmpregado = new AprhoEmpregado();
        
        
        let cloneAprhoEmpregado = new AprhoEmpregado();
        cloneAprhoEmpregado.setId(this.getValue(aprhoEmpregado,"getId"));
        cloneAprhoEmpregado.setAtual(this.getValue(aprhoEmpregado, "getAtual"));
        cloneAprhoEmpregado.setEntrevistado(this.getValue(aprhoEmpregado, "getEntrevistado"));
        cloneAprhoEmpregado.setVersion(this.getValue(aprhoEmpregado, "getVersion"));
        cloneAprhoEmpregado.setEmpregado(new EmpregadoBuilder().clone(this.getValue( aprhoEmpregado, "getEmpregado" )));
        cloneAprhoEmpregado.setAprho(new AprhoBuilder().clone(this.getValue( aprhoEmpregado, "getAprho" )));
        
        return cloneAprhoEmpregado;
    }
    
    cloneList(aprhoEmpregados: Array<AprhoEmpregado>): Array<AprhoEmpregado> {
        let array:Array<AprhoEmpregado> = new Array<AprhoEmpregado>();
    
        if (aprhoEmpregados !== null && aprhoEmpregados !== undefined) { 
            for (let aprhoEmpregado of aprhoEmpregados) {
                array.push(this.clone(aprhoEmpregado));
            }
        }
        
        return array;
    }
    
    initializeList(aprhoEmpregados: Array<AprhoEmpregado>) {
        
        let array:Array<AprhoEmpregado> = new Array<AprhoEmpregado>();
        
        if(aprhoEmpregados === null || aprhoEmpregados === undefined)
            aprhoEmpregados = new Array<AprhoEmpregado>();
        
        for (let aprhoEmpregado of aprhoEmpregados) {
            array.push(this.initialize(aprhoEmpregado));
        }
        
        return array;
    }    
}