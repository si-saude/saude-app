import { Atestado } from './../../model/atestado';
import { TarefaBuilder } from './../tarefa/tarefa.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AtestadoBuilder extends GenericBuilder {
    
    initialize(atestado: Atestado) {
        atestado = new Atestado();
        
        atestado.setTarefa(new TarefaBuilder().initialize(atestado.getTarefa()));
        
        return atestado;
    }
    
    initializeList(atestados: Array<Atestado>) {
        
        let array:Array<Atestado> = new Array<Atestado>();
        
        if(atestados === null || atestados === undefined)
            atestados = new Array<Atestado>();
        
        for (let atestado of atestados) {
            array.push(this.initialize(atestado));
        }
        
        return array;
    }
    
    clone(atestado: Atestado): Atestado {
        
        if (atestado === null || atestado === undefined)
            atestado = new Atestado();
        
        let cloneAtestado = new Atestado();
        cloneAtestado.setId(this.getValue(atestado,"getId"));
        cloneAtestado.setVersion(this.getValue(atestado,"getVersion"));
        cloneAtestado.setCID(this.getValue(atestado,"getCID"));
        cloneAtestado.setAnexoBase64(this.getValue(atestado,"getAnexoBase64"));
        cloneAtestado.setAtestadoFisicoRecebido(this.getValue(atestado,"getAtestadoFisicoRecebido"));
        cloneAtestado.setControleLicenca(this.getValue(atestado,"getControleLicenca"));
        cloneAtestado.setDataAgendamento(this.getValue(atestado,"getDataAgendamento"));
        cloneAtestado.setDataSolicitacao(this.getValue(atestado,"getDataSolicitacao"));
        cloneAtestado.setImpossibilidadeLocomocao(this.getValue(atestado,"getImpossibilidadeLocomocao"));
        cloneAtestado.setLancadoSAP(this.getValue(atestado,"getLancadoSAP"));
        cloneAtestado.setNumeroDias(this.getValue(atestado,"getNumeroDias"));
        cloneAtestado.setStatus(this.getValue(atestado,"getStatus"));
        
        cloneAtestado.setTarefa(
                new TarefaBuilder().clone(this.getValue(atestado,"getTarefa")));
        
        return cloneAtestado;
    }
    
    cloneList(atestados: Array<Atestado>): Array<Atestado> {
        let array:Array<Atestado> = new Array<Atestado>();
    
        if (atestados !== null && atestados !== undefined) { 
            for (let atestado of atestados) {
                array.push(this.clone(atestado));
            }
        }
        
        return array;
    }
    
}