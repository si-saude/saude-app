import { Atestado } from './../../model/atestado';
import { TarefaBuilder } from './../tarefa/tarefa.builder';
import { CatBuilder } from './../cat/cat.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AtestadoBuilder extends GenericBuilder {
    
    initialize(atestado: Atestado) {
        atestado = new Atestado();
        
        atestado.setTarefa(new TarefaBuilder().initialize(atestado.getTarefa()));
        atestado.setCat(new CatBuilder().initialize(atestado.getCat()))
        
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
        cloneAtestado.setCid(this.getValue(atestado,"getCid"));
        cloneAtestado.setAnexoBase64(this.getValue(atestado,"getAnexoBase64"));
        cloneAtestado.setAtestadoFisicoRecebido(this.getValue(atestado,"getAtestadoFisicoRecebido"));
        cloneAtestado.setControleLicenca(this.getValue(atestado,"getControleLicenca"));
        cloneAtestado.setDataAgendamento(this.getValue(atestado,"getDataAgendamento"));
        cloneAtestado.setDataSolicitacao(this.getValue(atestado,"getDataSolicitacao"));
        cloneAtestado.setImpossibilidadeLocomocao(this.getValue(atestado,"getImpossibilidadeLocomocao"));
        cloneAtestado.setLancadoSap(this.getValue(atestado,"getLancadoSap"));
        cloneAtestado.setNumeroDias(this.getValue(atestado,"getNumeroDias"));
        cloneAtestado.setStatus(this.getValue(atestado,"getStatus"));
        
        cloneAtestado.setTarefa(
                new TarefaBuilder().clone(this.getValue(atestado,"getTarefa")));
        
        if (this.getValue(atestado, "getCat") !== undefined) { 
            cloneAtestado.setCat(
                    new CatBuilder().clone(this.getValue(atestado,"getCat")));
            if(!this.idGtZero(cloneAtestado.getCat()))
                cloneAtestado.setCat(undefined);
        } else {
            cloneAtestado.setCat(new CatBuilder().initialize(null));
        }
        
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