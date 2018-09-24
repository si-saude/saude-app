import { HistoricoAtestado } from './../../model/historico-atestado';
import { Atestado } from './../../model/atestado';
import { AtestadoBuilder } from './../atestado/atestado.builder';
import { Profissional } from './../../model/profissional';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class HistoricoAtestadoBuilder extends GenericBuilder{
    
    initialize(historicoAtestado: HistoricoAtestado) {
        historicoAtestado = new HistoricoAtestado();
        
        historicoAtestado.setAtestado(new AtestadoBuilder().initialize(new Atestado()));
        historicoAtestado.setProfissional(new ProfissionalSaudeBuilder().initialize(new Profissional()));
        
        return historicoAtestado;
    }
    
    initializeList(historicoAtestados: Array<HistoricoAtestado>) {
        
        let array: Array<HistoricoAtestado> = new Array<HistoricoAtestado>();
        
        if(historicoAtestados === null || historicoAtestados === undefined)
            historicoAtestados = new Array<HistoricoAtestado>();
        
        for (let historicoAtestado of historicoAtestados) {
            array.push(this.initialize(historicoAtestado));
        }
        
        return array;
    }
    
    
    clone(historicoAtestado: HistoricoAtestado) {        
        let cloneHistoricoAtestado = new HistoricoAtestado();
        
        if (historicoAtestado === null || historicoAtestado === undefined)
            historicoAtestado = new HistoricoAtestado();
        
        cloneHistoricoAtestado.setId(this.getValue(historicoAtestado, "getId"));
        cloneHistoricoAtestado.setVersion(this.getValue(historicoAtestado, "getVersion"));
        cloneHistoricoAtestado.setStatus(this.getValue(historicoAtestado, "getStatus"));
        cloneHistoricoAtestado.setData(this.getValue(historicoAtestado, "getData"));
        
        if (this.getValue(historicoAtestado, "getProfissional") !== undefined) { 
            cloneHistoricoAtestado.setProfissional(
                    new ProfissionalSaudeBuilder().clone(this.getValue(historicoAtestado,"getProfissional")));
            if(!this.idGtZero(cloneHistoricoAtestado.getProfissional()))
                cloneHistoricoAtestado.setProfissional(undefined);
        } else {
            cloneHistoricoAtestado.setProfissional(new ProfissionalSaudeBuilder().initialize(null));
        }
        
        if (this.getValue(historicoAtestado, "getAtestado") !== undefined) { 
            cloneHistoricoAtestado.setAtestado(
                    new AtestadoBuilder().clone(this.getValue(historicoAtestado,"getAtestado")));
            if(!this.idGtZero(cloneHistoricoAtestado.getAtestado()))
                cloneHistoricoAtestado.setAtestado(undefined);
        } else {
            cloneHistoricoAtestado.setAtestado(new AtestadoBuilder().initialize(null));
        }
        
        return cloneHistoricoAtestado;
    } 
    
    cloneList(historicoAtestados: Array<HistoricoAtestado>): Array<HistoricoAtestado>{
        let array:Array<HistoricoAtestado> = new Array<HistoricoAtestado>();
    
        if (historicoAtestados !== null && historicoAtestados !== undefined) {
            for (let historicoAtestado of historicoAtestados) {
                array.push(this.clone(historicoAtestado));
            }
        }
    
        return array;
    }
    
}