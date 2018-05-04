import { Acao } from './../../model/acao';
import { AcaoBuilder } from './../acao/acao.builder';
import { Acompanhamento } from './../../model/acompanhamento';
import { GenericBuilder } from './../../generics/generic.builder';

export class AcompanhamentoBuilder extends GenericBuilder {
    
    initialize(acompanhamento: Acompanhamento) {
        acompanhamento = new Acompanhamento();
        
        acompanhamento.setAcao(new Acao());
        
        return acompanhamento;
    }
    
    initializeList(acompanhamentos: Array<Acompanhamento>) {
        
        let array:Array<Acompanhamento> = new Array<Acompanhamento>();
        
        if(acompanhamentos === null || acompanhamentos === undefined)
            acompanhamentos = new Array<Acompanhamento>();
        
        for (let acompanhamento of acompanhamentos) {
            array.push(this.initialize(acompanhamento));
        }
        
        return array;
    }
    
    clone(acompanhamento: Acompanhamento): Acompanhamento {
        
        if (acompanhamento === null || acompanhamento === undefined)
            acompanhamento = new Acompanhamento();
        
        let cloneAcompanhamento = new Acompanhamento();
        cloneAcompanhamento.setId(this.getValue(acompanhamento,"getId"));
        cloneAcompanhamento.setVersion(this.getValue(acompanhamento,"getVersion"));
        cloneAcompanhamento.setDescricao(this.getValue(acompanhamento,"getDescricao"));
        
        if (this.getValue(acompanhamento,"getAcao") !== undefined) { 
            cloneAcompanhamento.setAcao(new AcaoBuilder().clone(this.getValue(acompanhamento,"getAcao")))
            if(!this.idGtZero(cloneAcompanhamento.getAcao()))
                cloneAcompanhamento.setAcao(undefined);
        } else {
            cloneAcompanhamento.setAcao(new AcaoBuilder().initialize(null));
        }
        
        return cloneAcompanhamento;
    }
    
    cloneList(acompanhamentos: Array<Acompanhamento>): Array<Acompanhamento> {
        let array:Array<Acompanhamento> = new Array<Acompanhamento>();
    
        if (acompanhamentos !== null && acompanhamentos !== undefined) { 
            for (let acompanhamento of acompanhamentos) {
                array.push(this.clone(acompanhamento));
            }
        }
        
        return array;
    }
    
}