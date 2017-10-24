import { Exame } from './../../model/exame'; 
import { GenericBuilder } from './../../generics/generic.builder';

export class ExameBuilder extends GenericBuilder{
    
    initialize(exame: Exame): Exame {
        exame = new Exame();
        
        return exame;
    }
    
    clone(exame: Exame): Exame {        
        let cloneExame = new Exame();
        
        if (exame === null || exame === undefined)
            exame = new Exame();
        
        cloneExame.setId(this.getValue(exame, "getId"));
        cloneExame.setVersion(this.getValue(exame, "getVersion"));
        cloneExame.setCodigo(this.getValue(exame, "getCodigo"));
        cloneExame.setDescricao(this.getValue(exame, "getDescricao"));
                
        return cloneExame;
    } 
    
}