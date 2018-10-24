import { Profissiograma } from './../../model/profissiograma';
import { GrupoMonitoramentoProfissiogramaBuilder } from './../grupo-monitoramento-profissiograma/grupo-monitoramento-profissiograma.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ProfissiogramaBuilder extends GenericBuilder{
    
    initialize(profissiograma: Profissiograma): Profissiograma {
        profissiograma = new Profissiograma();
        
        profissiograma.setGrupoMonitoramentoProfissiogramas(new GrupoMonitoramentoProfissiogramaBuilder()
            .initializeList(profissiograma.getGrupoMonitoramentoProfissiogramas()));
        
        return profissiograma;
    }
    
    initializeList(profissiogramas: Array<Profissiograma>) {
        
        let array:Array<Profissiograma> = new Array<Profissiograma>();
        
        if(profissiogramas === null || profissiogramas === undefined)
            profissiogramas = new Array<Profissiograma>();
        
        for (let profissiograma of profissiogramas) {
            array.push(this.initialize(profissiograma));
        }
        
        return array;
    }
    
    clone(profissiograma: Profissiograma): Profissiograma {
        let cloneProfissiograma = new Profissiograma();
        
        if (profissiograma === null || profissiograma === undefined)
            profissiograma = new Profissiograma();
        
        cloneProfissiograma.setId(this.getValue(profissiograma, "getId"));
        cloneProfissiograma.setVersion(this.getValue(profissiograma, "getVersion"));
        cloneProfissiograma.setNome(this.getValue(profissiograma, "getNome"));
        cloneProfissiograma.setConcluido(this.getValue(profissiograma, "getConcluido"));
        
        cloneProfissiograma.setGrupoMonitoramentoProfissiogramas(
                new GrupoMonitoramentoProfissiogramaBuilder()
                    .cloneList(this.getValue(profissiograma, "getGrupoMonitoramentoProfissiogramas")));
        
        return cloneProfissiograma;
    }
    
    cloneList(profissiogramas: Array<Profissiograma>): Array<Profissiograma> {
        let array:Array<Profissiograma> = new Array<Profissiograma>();
    
        if (profissiogramas !== null && profissiogramas !== undefined) { 
            for (let profissiograma of profissiogramas) {
                array.push(this.clone(profissiograma));
            }
        }
        
        return array;
    }
}