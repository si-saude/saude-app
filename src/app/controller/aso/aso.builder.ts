import { Aso } from './../../model/aso';
import { Atendimento } from './../../model/atendimento';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AsoBuilder extends GenericBuilder {
    
    initialize(aso: Aso) {
        aso = new Aso();
        
        aso.setAtendimento(new Atendimento());
        aso.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        
        return aso;
    }
    
    initializeList(asos: Array<Aso>) {
        
        let array:Array<Aso> = new Array<Aso>();
        
        if(asos === null || asos === undefined)
            asos = new Array<Aso>();
        
        for (let aso of asos) {
            array.push(this.initialize(aso));
        }
        
        return array;
    }
    
    clone(aso: Aso): Aso {
        
        if (aso === null || aso === undefined)
            aso = new Aso();
        
        let cloneAso = new Aso();
        cloneAso.setId(this.getValue(aso,"getId"));
        cloneAso.setVersion(this.getValue(aso,"getVersion"));
        cloneAso.setData(this.getValue(aso,"getData"));
        cloneAso.setValidade(this.getValue(aso,"getValidade"));
        
        cloneAso.setAtendimento(new Atendimento());
        cloneAso.setEmpregado(new EmpregadoBuilder().clone(this.getValue(aso,"getEmpregado")));
        
        return cloneAso;
    }
    
    cloneList(asos: Array<Aso>): Array<Aso> {
        let array:Array<Aso> = new Array<Aso>();
    
        if (asos !== null && asos !== undefined) { 
            for (let aso of asos) {
                array.push(this.clone(aso));
            }
        }
        
        return array;
    }
    
}