import { RiscoEmpregado } from './../../model/risco-empregado';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { Triagem } from './../../model/triagem';
import { GenericBuilder } from './../../generics/generic.builder';

export class RiscoEmpregadoBuilder extends GenericBuilder {
    
    initialize(riscoEmpregado: RiscoEmpregado) {
        riscoEmpregado = new RiscoEmpregado();
        
        riscoEmpregado.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        riscoEmpregado.setEquipe(new EquipeBuilder().initialize(new Equipe()));
        riscoEmpregado.setTriagens(new Array<Triagem>());
        
        return riscoEmpregado;
    }
    
    initializeList(riscoEmpregados: Array<RiscoEmpregado>) {
        
        let array:Array<RiscoEmpregado> = new Array<RiscoEmpregado>();
        
        if(riscoEmpregados === null || riscoEmpregados === undefined)
            riscoEmpregados = new Array<RiscoEmpregado>();
        
        for (let riscoEmpregado of riscoEmpregados) {
            array.push(this.initialize(riscoEmpregado));
        }
        
        return array;
    }
    
    clone(riscoEmpregado: RiscoEmpregado): RiscoEmpregado {
        
        if (riscoEmpregado === null || riscoEmpregado === undefined)
            riscoEmpregado = new RiscoEmpregado();
        
        let cloneRiscoEmpregado = new RiscoEmpregado();
        cloneRiscoEmpregado.setId(this.getValue(riscoEmpregado,"getId"));
        cloneRiscoEmpregado.setVersion(this.getValue(riscoEmpregado,"getVersion"));
        cloneRiscoEmpregado.setValor(this.getValue(riscoEmpregado,"getValor"));
        
        cloneRiscoEmpregado.setEmpregado(new EmpregadoBuilder().clone(this.getValue(riscoEmpregado,"getEmpregado")));
        cloneRiscoEmpregado.setEquipe(new EquipeBuilder().clone(this.getValue(riscoEmpregado,"getEquipe")));
        cloneRiscoEmpregado.setTriagens(new Array<Triagem>());
        
        return cloneRiscoEmpregado;
    }
    
    cloneList(riscoEmpregados: Array<RiscoEmpregado>): Array<RiscoEmpregado> {
        let array:Array<RiscoEmpregado> = new Array<RiscoEmpregado>();
    
        if (riscoEmpregados !== null && riscoEmpregados !== undefined) {    
            for (let riscoEmpregado of riscoEmpregados) {
                array.push(this.clone(riscoEmpregado));
            }
        }
        
        return array;
    }
    
}