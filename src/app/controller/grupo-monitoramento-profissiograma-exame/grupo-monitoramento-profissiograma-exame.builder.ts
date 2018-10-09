import { GrupoMonitoramentoProfissiogramaExame } from './../../model/grupo-monitoramento-profissiograma-exame';
import { GrupoMonitoramentoProfissiograma } from './../../model/grupo-monitoramento-profissiograma';
import { Exame } from './../../model/exame';
import { Criterio } from './../../model/criterio';
import { ExameBuilder } from './../exame/exame.builder';
import { CriterioBuilder } from './../criterio/criterio.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class GrupoMonitoramentoProfissiogramaExameBuilder extends GenericBuilder{
    
    initialize(g: GrupoMonitoramentoProfissiogramaExame): GrupoMonitoramentoProfissiogramaExame {
        g = new GrupoMonitoramentoProfissiogramaExame();
        
        g.setGrupoMonitoramentoProfissiograma(new GrupoMonitoramentoProfissiograma());
        g.setExame(new ExameBuilder().initialize(new Exame()));
        g.setCriterios(new CriterioBuilder().initializeList(g.getCriterios()))
        
        return g;
    }
    
    initializeList(gs: Array<GrupoMonitoramentoProfissiogramaExame>) {
        
        let array: Array<GrupoMonitoramentoProfissiogramaExame> = new Array<GrupoMonitoramentoProfissiogramaExame>();
        
        if(gs === null || gs === undefined)
            gs = new Array<GrupoMonitoramentoProfissiogramaExame>();
        
        for (let g of gs) {
            array.push(this.initialize(g));
        }
        
        return array;
    }
    
    clone(g: GrupoMonitoramentoProfissiogramaExame): GrupoMonitoramentoProfissiogramaExame {        
        let cloneG = new GrupoMonitoramentoProfissiogramaExame();
        
        if (g === null || g === undefined)
            g = new GrupoMonitoramentoProfissiogramaExame();
        
        cloneG.setId(this.getValue(g, "getId"));
        cloneG.setVersion(this.getValue(g, "getVersion"));
        cloneG.setOpcional(this.getValue(g, "getOpcional"))
        
        cloneG.setGrupoMonitoramentoProfissiograma(new GrupoMonitoramentoProfissiograma());
        
        if ( this.getValue( g, "getExame" ) !== undefined ) {
            if ( this.getValue(this.getValue( g, "getExame" ), "getId") > 0 )
                cloneG.setExame(new ExameBuilder().clone(this.getValue( g, "getExame" )));
            else cloneG.setExame(undefined);
        } else{
            cloneG.setExame(new ExameBuilder().initialize(null));
        }
        
        cloneG.setCriterios(new CriterioBuilder().cloneList(this.getValue( g, "getCriterios" )));        
        
        return cloneG;
    }
    
    cloneList(gs: Array<GrupoMonitoramentoProfissiogramaExame>): Array<GrupoMonitoramentoProfissiogramaExame> {
        let array:Array<GrupoMonitoramentoProfissiogramaExame> = new Array<GrupoMonitoramentoProfissiogramaExame>();
   
        if (gs !== null && gs !== undefined) { 
            for (let g of gs) {
                array.push(this.clone(g));
            }
        }
        
        return array;
    }
}