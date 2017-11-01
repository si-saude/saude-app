import { Vacina } from './../../model/vacina';
import { ProfissionalVacina } from './../../model/profissional-vacina';
import { GenericBuilder } from './../../generics/generic.builder';

export class VacinaBuilder extends GenericBuilder {
    
    initialize(vacina: Vacina) {
        vacina = new Vacina();
        
        vacina.setProfissionalVacinas(new Array<ProfissionalVacina>());
        
        return vacina;
    }
    
    initializeList(vacinas: Array<Vacina>) {
        
        let array:Array<Vacina> = new Array<Vacina>();
        
        if(vacinas === null || vacinas === undefined)
            vacinas = new Array<Vacina>();
        
        for (let vacina of vacinas) {
            array.push(this.initialize(vacina));
        }
        
        return array;
    }
    
    clone(vacina: Vacina): Vacina {
        
        if (vacina === null || vacina === undefined)
            vacina = new Vacina();
        
        let cloneVacina = new Vacina();
        cloneVacina.setId(this.getValue(vacina,"getId"));
        cloneVacina.setVersion(this.getValue(vacina,"getVersion"));
        cloneVacina.setDescricao(this.getValue(vacina,"getDescricao"));
        cloneVacina.setReforco(this.getValue(vacina,"getReforco"));
        cloneVacina.setDoses(this.getValue(vacina,"getDoses"));
        cloneVacina.setProfissionalVacinas(new Array<ProfissionalVacina>());
        
        return cloneVacina;
    }
    
    cloneList(vacinas: Array<Vacina>): Array<Vacina> {
        let array:Array<Vacina> = new Array<Vacina>();
    
        if (vacinas !== null && vacinas !== undefined) {    
            for (let vacina of vacinas) {
                array.push(this.clone(vacina));
            }
        }
        
        return array;
    }
    
}