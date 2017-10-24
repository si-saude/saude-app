import { HistoricoGrupoMonitoramento } from './../../model/historico-grupo-monitoramento';
import { Empregado } from './../../model/empregado';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento/grupo-monitoramento.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class HistoricoGrupoMonitoramentoBuilder extends GenericBuilder{
    
    initialize(historicoGrupoMonitoramento: HistoricoGrupoMonitoramento): HistoricoGrupoMonitoramento {
        historicoGrupoMonitoramento = new HistoricoGrupoMonitoramento();
        
        historicoGrupoMonitoramento.setEmpregado(new Empregado());
        historicoGrupoMonitoramento.setGrupoMonitoramento(
                new GrupoMonitoramentoBuilder().initialize(new GrupoMonitoramento()));
        
        return historicoGrupoMonitoramento;
    }
    
    
    initializeList(historicosGrupoMonitoramento: Array<HistoricoGrupoMonitoramento>) {
        
        let array: Array<HistoricoGrupoMonitoramento> = new Array<HistoricoGrupoMonitoramento>();
        
        if(historicosGrupoMonitoramento === null || historicosGrupoMonitoramento === undefined)
            historicosGrupoMonitoramento = new Array<HistoricoGrupoMonitoramento>();
        
        for (let historicoGrupoMonitoramento of historicosGrupoMonitoramento) {
            array.push(this.initialize(historicoGrupoMonitoramento));
        }
        
        return array;
    }
    
   clone(historicoGrupoMonitoramento: HistoricoGrupoMonitoramento): HistoricoGrupoMonitoramento {        
        let cloneHistoricoGrupoMonitoramento = new HistoricoGrupoMonitoramento();
        
        if (historicoGrupoMonitoramento === null || historicoGrupoMonitoramento === undefined)
            historicoGrupoMonitoramento = new HistoricoGrupoMonitoramento();
        
        cloneHistoricoGrupoMonitoramento.setId(this.getValue(historicoGrupoMonitoramento, "getId"));
        cloneHistoricoGrupoMonitoramento.setVersion(this.getValue(historicoGrupoMonitoramento, "getVersion"));
        cloneHistoricoGrupoMonitoramento.setDataRemocao(this.getValue(historicoGrupoMonitoramento, "getDataRemocao"));
        
        cloneHistoricoGrupoMonitoramento.setEmpregado(new Empregado());
        
        if (this.getValue(historicoGrupoMonitoramento, "getGrupoMonitoramento") !== undefined) { 
            cloneHistoricoGrupoMonitoramento.setGrupoMonitoramento(
                    new GrupoMonitoramentoBuilder().clone(this.getValue(historicoGrupoMonitoramento,"getGrupoMonitoramento")));
            if(!this.idGtZero(cloneHistoricoGrupoMonitoramento.getGrupoMonitoramento()))
                cloneHistoricoGrupoMonitoramento.setGrupoMonitoramento(undefined);
        } else {
            cloneHistoricoGrupoMonitoramento.setGrupoMonitoramento(new GrupoMonitoramentoBuilder().initialize(null));
        }
        
        return cloneHistoricoGrupoMonitoramento;
    }
   
    cloneList(historicosGrupoMonitoramento: Array<HistoricoGrupoMonitoramento>): Array<HistoricoGrupoMonitoramento> {
        let array:Array<HistoricoGrupoMonitoramento> = new Array<HistoricoGrupoMonitoramento>();
   
        if (historicosGrupoMonitoramento !== null && historicosGrupoMonitoramento !== undefined) { 
            for (let historicoGrupoMonitoramento of historicosGrupoMonitoramento) {
                array.push(this.clone(historicoGrupoMonitoramento));
            }
        }
        
        return array;
    }
    
    
}