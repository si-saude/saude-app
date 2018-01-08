import { Exame } from './../../model/exame';
import { CampoExame } from './../../model/campo-exame';
import { CampoExameBuilder } from './../campo-exame/campo-exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ExameBuilder extends GenericBuilder{
    
    initialize(exame: Exame): Exame {
        exame = new Exame();
        
        exame.setCampoExames(new CampoExameBuilder().initializeList(new Array<CampoExame>()));
        
        return exame;
    }
    
    initializeList(exames: Array<Exame>) {
        
        let array: Array<Exame> = new Array<Exame>();
        
        if(exames === null || exames === undefined)
            exames = new Array<Exame>();
        
        for (let exame of exames) {
            array.push(this.initialize(exame));
        }
        
        return array;
    }
    
    clone(exame: Exame): Exame {        
        let cloneExame = new Exame();
        
        if (exame === null || exame === undefined)
            exame = new Exame();
        
        cloneExame.setId(this.getValue(exame, "getId"));
        cloneExame.setVersion(this.getValue(exame, "getVersion"));
        cloneExame.setCodigo(this.getValue(exame, "getCodigo"));
        cloneExame.setDescricao(this.getValue(exame, "getDescricao"));
         
        cloneExame.setCampoExames(new CampoExameBuilder().cloneList(this.getValue(exame, "getCampoExames")));
                
        return cloneExame;
    } 
    
    cloneList(exames: Array<Exame>): Array<Exame>{
        let array:Array<Exame> = new Array<Exame>();
    
        if (exames !== null && exames !== undefined) {
            for (let exame of exames) {
                array.push(this.clone(exame));
            }
        }
    
        return array;
    }
    
}