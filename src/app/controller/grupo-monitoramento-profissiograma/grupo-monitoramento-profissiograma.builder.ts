import { GrupoMonitoramentoProfissiograma } from './../../model/grupo-monitoramento-profissiograma';
import { Profissiograma } from './../../model/profissiograma';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { ProfissiogramaBuilder } from './../profissiograma/profissiograma.builder';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento/grupo-monitoramento.builder';
import { GrupoMonitoramentoProfissiogramaExameBuilder } from './../grupo-monitoramento-profissiograma-exame/grupo-monitoramento-profissiograma-exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class GrupoMonitoramentoProfissiogramaBuilder extends GenericBuilder{
    
    initialize(g: GrupoMonitoramentoProfissiograma): GrupoMonitoramentoProfissiograma {
        g = new GrupoMonitoramentoProfissiograma();
        
        g.setProfissiograma(new Profissiograma());
        g.setGrupoMonitoramento(new ProfissiogramaBuilder().clone(new Profissiograma()));
        g.setGrupoMonitoramentoProfissiogramaExames(new GrupoMonitoramentoProfissiogramaExameBuilder()
            .cloneList(g.getGrupoMonitoramentoProfissiogramaExames()));
     
        return g;
    }
    
    initializeList(gs: Array<GrupoMonitoramentoProfissiograma>) {
        
        let array: Array<GrupoMonitoramentoProfissiograma> = new Array<GrupoMonitoramentoProfissiograma>();
        
        if(gs === null || gs === undefined)
            gs = new Array<GrupoMonitoramentoProfissiograma>();
        
        for (let g of gs) {
            array.push(this.initialize(g));
        }
        
        return array;
    }
    
    clone(g: GrupoMonitoramentoProfissiograma): GrupoMonitoramentoProfissiograma {        
        let cloneG = new GrupoMonitoramentoProfissiograma();
        
        if (g === null || g === undefined)
            g = new GrupoMonitoramentoProfissiograma();
        
        cloneG.setId(this.getValue(g, "getId"));
        cloneG.setVersion(this.getValue(g, "getVersion"));
        
        cloneG.setProfissiograma(new Profissiograma());
        
        if ( this.getValue( g, "getGrupoMonitoramento" ) !== undefined ) {
            if ( this.getValue(this.getValue( g, "getGrupoMonitoramento" ), "getId") > 0 )
                cloneG.setGrupoMonitoramento(new GrupoMonitoramentoBuilder().clone(this.getValue( g, "getGrupoMonitoramento" )));
            else cloneG.setGrupoMonitoramento(undefined);
        } else{
            cloneG.setGrupoMonitoramento(new GrupoMonitoramentoBuilder().initialize(null));
        }
        
        cloneG.setGrupoMonitoramentoProfissiogramaExames(new GrupoMonitoramentoProfissiogramaExameBuilder()
            .cloneList(this.getValue( g, "getGrupoMonitoramentoProfissiogramaExames" )))
        
        return cloneG;
    }
    
    cloneList(gs: Array<GrupoMonitoramentoProfissiograma>): Array<GrupoMonitoramentoProfissiograma>{
        let array:Array<GrupoMonitoramentoProfissiograma> = new Array<GrupoMonitoramentoProfissiograma>();
    
        if (gs !== null && gs !== undefined) {
            for (let g of gs) {
                array.push(this.clone(g));
            }
        }
    
        return array;
    }
    
}