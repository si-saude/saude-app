import { ProfissionalVacina } from './../../model/profissional-vacina';
import { Vacina } from './../../model/vacina';
import { Profissional } from './../../model/profissional';
import { VacinaBuilder } from './../vacina/vacina.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ProfissionalVacinaBuilder extends GenericBuilder {
    
    initialize(profissionalVacina: ProfissionalVacina) {
        profissionalVacina = new ProfissionalVacina();
        profissionalVacina.setVacina(new VacinaBuilder().initialize(profissionalVacina.getVacina()));
        return profissionalVacina;
    }
    
    initializeList(profissionalVacinas: Array<ProfissionalVacina>) {
        
        let array:Array<ProfissionalVacina> = new Array<ProfissionalVacina>();
        
        if(profissionalVacinas === null || profissionalVacinas === undefined)
            profissionalVacinas = new Array<ProfissionalVacina>();
        
        for (let profissionalVacina of profissionalVacinas) {
            array.push(this.initialize(profissionalVacina));
        }
        
        return array;
    }
    
    cloneList(profissionalVacinas: Array<ProfissionalVacina>) : Array<ProfissionalVacina> {
        let array:Array<ProfissionalVacina> = new Array<ProfissionalVacina>();
    
        if (profissionalVacinas !== null && profissionalVacinas !== undefined) {
            for (let profissionalVacina of profissionalVacinas) {
                array.push(this.clone(profissionalVacina));
            }
        }
    
        return array;
    }
    
    clone(profissionalVacina: ProfissionalVacina): ProfissionalVacina {
        
        if (profissionalVacina === null || profissionalVacina === undefined)
            profissionalVacina = new ProfissionalVacina();
        
        let cloneProfissionalVacina = new ProfissionalVacina();
        cloneProfissionalVacina.setId(this.getValue(profissionalVacina,"getId"));
        cloneProfissionalVacina.setVersion(this.getValue(profissionalVacina,"getVersion"));
        cloneProfissionalVacina.setDose(this.getValue(profissionalVacina,"getDose"));
        cloneProfissionalVacina.setLaboratorio(this.getValue(profissionalVacina,"getLaboratorio"));
        cloneProfissionalVacina.setLote(this.getValue(profissionalVacina,"getLote"));
        cloneProfissionalVacina.setProximaDose(this.getValue(profissionalVacina,"getProximaDose"));
        cloneProfissionalVacina.setVacina(this.getValue(profissionalVacina,"getVacina"));
        cloneProfissionalVacina.setData(this.getValue(profissionalVacina,"getData"));
        cloneProfissionalVacina.setVacina(
                new VacinaBuilder().clone(this.getValue(profissionalVacina,"getVacina")));
        cloneProfissionalVacina.setProfissional(new Profissional());
        
        return cloneProfissionalVacina;
    }
    
}