import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GrupoMonitoramentoExame } from './../../model/grupo-monitoramento-exame';
import { Empregado } from './../../model/empregado';
import { Profissiograma } from './../../model/profissiograma';
import { TipoGrupoMonitoramento } from './../../model/tipo-grupo-monitoramento';
import { TipoGrupoMonitoramentoBuilder } from './../tipo-grupo-monitoramento/tipo-grupo-monitoramento.builder';
import { GrupoMonitoramentoExameBuilder } from './../grupo-monitoramento-exame/grupo-monitoramento-exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class GrupoMonitoramentoBuilder extends GenericBuilder{
    
    initialize(grupoMonitoramento: GrupoMonitoramento): GrupoMonitoramento {
        grupoMonitoramento = new GrupoMonitoramento();
        
        grupoMonitoramento.setEmpregados(new Array<Empregado>());
        grupoMonitoramento.setProfissiogramas(new Array<Profissiograma>());
        grupoMonitoramento.setTipoGrupoMonitoramento(
                new TipoGrupoMonitoramentoBuilder().initialize(grupoMonitoramento.getTipoGrupoMonitoramento()));
        grupoMonitoramento.setGrupoMonitoramentoExames(
                new GrupoMonitoramentoExameBuilder().initializeList(grupoMonitoramento.getGrupoMonitoramentoExames()));
        
        return grupoMonitoramento;
    }
    
    initializeList(gruposMonitoramento: Array<GrupoMonitoramento>) {
        
        let array: Array<GrupoMonitoramento> = new Array<GrupoMonitoramento>();
        
        if(gruposMonitoramento === null || gruposMonitoramento === undefined)
            gruposMonitoramento = new Array<GrupoMonitoramento>();
        
        for (let grupoMonitoramento of gruposMonitoramento) {
            array.push(this.initialize(grupoMonitoramento));
        }
        
        return array;
    }
    
    clone(grupoMonitoramento: GrupoMonitoramento): GrupoMonitoramento {        
        let cloneGrupoMonitoramento = new GrupoMonitoramento();
        
        if (grupoMonitoramento === null || grupoMonitoramento === undefined)
            grupoMonitoramento = new GrupoMonitoramento();
        
        cloneGrupoMonitoramento.setId(this.getValue(grupoMonitoramento, "getId"));
        cloneGrupoMonitoramento.setVersion(this.getValue(grupoMonitoramento, "getVersion"));
        cloneGrupoMonitoramento.setNome(this.getValue(grupoMonitoramento, "getNome"));
        cloneGrupoMonitoramento.setRecorrente(this.getValue(grupoMonitoramento, "getRecorrente"));
        cloneGrupoMonitoramento.setRelatorio(this.getValue(grupoMonitoramento, "getRelatorio"));
        
        if ( this.getValue(grupoMonitoramento, "getTipoGrupoMonitoramento") !== undefined ) {
            cloneGrupoMonitoramento.setTipoGrupoMonitoramento(
                    new TipoGrupoMonitoramentoBuilder().clone(
                            this.getValue(grupoMonitoramento,"getTipoGrupoMonitoramento")));
            if(!this.idGtZero(cloneGrupoMonitoramento.getTipoGrupoMonitoramento()))
                cloneGrupoMonitoramento.setTipoGrupoMonitoramento(undefined);
        } else {
            cloneGrupoMonitoramento.setTipoGrupoMonitoramento(
                    new TipoGrupoMonitoramentoBuilder().initialize(null));
        }
        
        if ( this.getValue(grupoMonitoramento, "getGrupoMonitoramentoExames") !== undefined ) {
            cloneGrupoMonitoramento.setGrupoMonitoramentoExames(
                    new GrupoMonitoramentoExameBuilder().cloneList(
                            this.getValue(grupoMonitoramento,"getGrupoMonitoramentoExames")));
        } else {
            cloneGrupoMonitoramento.setGrupoMonitoramentoExames(
                    new GrupoMonitoramentoExameBuilder().initializeList(null));
        }
        
        cloneGrupoMonitoramento.setEmpregados(new Array<Empregado>());
        cloneGrupoMonitoramento.setProfissiogramas(new Array<Profissiograma>());
                
        return cloneGrupoMonitoramento;
    } 
    
    cloneList(gruposMonitoramento: Array<GrupoMonitoramento>): Array<GrupoMonitoramento>{
        let array:Array<GrupoMonitoramento> = new Array<GrupoMonitoramento>();
    
        if (gruposMonitoramento !== null && gruposMonitoramento !== undefined) {
            for (let grupoMonitoramento of gruposMonitoramento) {
                array.push(this.clone(grupoMonitoramento));
            }
        }
    
        return array;
    }
    
}