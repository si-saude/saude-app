import { Exame } from './../../model/exame';
import { ExameBuilder } from './../exame/exame.builder';
import { Criterio } from './../../model/criterio';
import { CriterioBuilder } from './../criterio/criterio.builder';
import { GrupoMonitoramentoExame } from './../../model/grupo-monitoramento-exame';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GenericBuilder } from './../../generics/generic.builder';

export class GrupoMonitoramentoExameBuilder extends GenericBuilder{
    
    initialize(grupoMonitoramentoExame: GrupoMonitoramentoExame): GrupoMonitoramentoExame {
        grupoMonitoramentoExame = new GrupoMonitoramentoExame();
        
        grupoMonitoramentoExame.setExame(new ExameBuilder().initialize(grupoMonitoramentoExame.getExame()));
        grupoMonitoramentoExame.setGrupoMonitoramento(new GrupoMonitoramento());        
        
        return grupoMonitoramentoExame;
    }
    
    initializeList(gruposMonitoramentoExame: Array<GrupoMonitoramentoExame>) {
        
        let array: Array<GrupoMonitoramentoExame> = new Array<GrupoMonitoramentoExame>();
        
        if(gruposMonitoramentoExame === null || gruposMonitoramentoExame === undefined)
            gruposMonitoramentoExame = new Array<GrupoMonitoramentoExame>();
        
        for (let grupoMonitoramentoExame of gruposMonitoramentoExame) {
            array.push(this.initialize(grupoMonitoramentoExame));
        }
        
        return array;
    }
    
    
    clone(grupoMonitoramentoExame: GrupoMonitoramentoExame): GrupoMonitoramentoExame {        
        let cloneGrupoMonitoramentoExame = new GrupoMonitoramentoExame();
        
        if (grupoMonitoramentoExame === null || grupoMonitoramentoExame === undefined)
            grupoMonitoramentoExame = new GrupoMonitoramentoExame();
        
        cloneGrupoMonitoramentoExame.setId(this.getValue(grupoMonitoramentoExame, "getId"));
        cloneGrupoMonitoramentoExame.setVersion(this.getValue(grupoMonitoramentoExame, "getVersion"));
        cloneGrupoMonitoramentoExame.setExame(this.getValue(grupoMonitoramentoExame, "getExame"));
        
        if (this.getValue(grupoMonitoramentoExame, "getExame") !== undefined) { 
            cloneGrupoMonitoramentoExame.setExame(
                    new ExameBuilder().clone(this.getValue(grupoMonitoramentoExame,"getExame")));
            if(!this.idGtZero(cloneGrupoMonitoramentoExame.getExame()))
                cloneGrupoMonitoramentoExame.setExame(undefined);
        } else {
            cloneGrupoMonitoramentoExame.setExame(new ExameBuilder().initialize(null));
        }
        
        cloneGrupoMonitoramentoExame.setCriterios(
                new CriterioBuilder().cloneList(this.getValue(grupoMonitoramentoExame,"getCriterios")));
        
        cloneGrupoMonitoramentoExame.setGrupoMonitoramento(new GrupoMonitoramento());
                
        return cloneGrupoMonitoramentoExame;
    } 
    
    cloneList(gruposMonitoramentoExame: Array<GrupoMonitoramentoExame>): Array<GrupoMonitoramentoExame>{
        let array:Array<GrupoMonitoramentoExame> = new Array<GrupoMonitoramentoExame>();
    
        if (gruposMonitoramentoExame !== null && gruposMonitoramentoExame !== undefined) {
            for (let grupoMonitoramentoExame of gruposMonitoramentoExame) {
                array.push(this.clone(grupoMonitoramentoExame));
            }
        }
    
        return array;
    }
    
}