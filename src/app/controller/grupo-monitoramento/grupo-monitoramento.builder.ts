import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { Empregado } from './../../model/empregado';
import { Avaliacao } from './../../model/avaliacao';
import { TipoGrupoMonitoramento } from './../../model/tipo-grupo-monitoramento';
import { TipoGrupoMonitoramentoBuilder } from './../tipo-grupo-monitoramento/tipo-grupo-monitoramento.builder';
import { AvaliacaoBuilder } from './../avaliacao/avaliacao.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class GrupoMonitoramentoBuilder extends GenericBuilder{
    
    initialize(grupoMonitoramento: GrupoMonitoramento): GrupoMonitoramento {
        grupoMonitoramento = new GrupoMonitoramento();
        
        grupoMonitoramento.setEmpregados(new Array<Empregado>());
        grupoMonitoramento.setAvaliacoes(new Array<Avaliacao>());
        
        grupoMonitoramento.setTipoGrupoMonitoramento(
                new TipoGrupoMonitoramentoBuilder().initialize(grupoMonitoramento.getTipoGrupoMonitoramento()));
        
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
        cloneGrupoMonitoramento.setAuditoriaAso(this.getValue(grupoMonitoramento, "getAuditoriaAso"));
        
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
        
        cloneGrupoMonitoramento.setAvaliacoes(
                new AvaliacaoBuilder().cloneList(
                        this.getValue(grupoMonitoramento,"getAvaliacoes")));
        
        
        cloneGrupoMonitoramento.setEmpregados(new Array<Empregado>());
                
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