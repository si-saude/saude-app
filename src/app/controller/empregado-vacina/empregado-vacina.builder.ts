import { EmpregadoVacina } from './../../model/empregado-vacina';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { Vacina } from './../../model/vacina';
import { VacinaBuilder } from './../vacina/vacina.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class EmpregadoVacinaBuilder extends GenericBuilder {
    
    initialize(empregadoVacina: EmpregadoVacina) {
        empregadoVacina = new EmpregadoVacina();
        
        empregadoVacina.setVacina(new VacinaBuilder().initialize(new Vacina()));
        empregadoVacina.setEmpregado(new Empregado());
        
        return empregadoVacina;
    }
    
    initializeList(empregadoVacinas: Array<EmpregadoVacina>) {
        
        let array:Array<EmpregadoVacina> = new Array<EmpregadoVacina>();
        
        if(empregadoVacinas === null || empregadoVacinas === undefined)
            empregadoVacinas = new Array<EmpregadoVacina>();
        
        for (let empregadoVacina of empregadoVacinas) {
            array.push(this.initialize(empregadoVacina));
        }
        
        return array;
    }
    
    clone(empregadoVacina: EmpregadoVacina): EmpregadoVacina {
        
        if (empregadoVacina === null || empregadoVacina === undefined)
            empregadoVacina = new EmpregadoVacina();
        
        let cloneEmpregadoVacina = new EmpregadoVacina();
        cloneEmpregadoVacina.setId(this.getValue(empregadoVacina, "getId"));
        cloneEmpregadoVacina.setVersion(this.getValue(empregadoVacina, "getVersion"));
        cloneEmpregadoVacina.setData(this.getValue(empregadoVacina, "getData"));
        cloneEmpregadoVacina.setDose(this.getValue(empregadoVacina, "getDose"));
        cloneEmpregadoVacina.setLaboratorio(this.getValue(empregadoVacina, "getLaboratorio"));
        cloneEmpregadoVacina.setLote(this.getValue(empregadoVacina, "getLote"));
        cloneEmpregadoVacina.setProximaDose(this.getValue(empregadoVacina, "getProximaDose"));
        cloneEmpregadoVacina.setVacina(new VacinaBuilder().clone(this.getValue(empregadoVacina, "getVacina")));
        cloneEmpregadoVacina.setEmpregado(new Empregado());
        
        return cloneEmpregadoVacina;
    }
    
    cloneList(empregadoVacinas: Array<EmpregadoVacina>){
        
        if(empregadoVacinas === null || empregadoVacinas === undefined)
            empregadoVacinas = new Array<EmpregadoVacina>();
        
        let array:Array<EmpregadoVacina> = new Array<EmpregadoVacina>();
    
        for (let empregadoVacina of empregadoVacinas) {
            array.push(this.clone(empregadoVacina));
        }
    
        return array;
    }
    
}