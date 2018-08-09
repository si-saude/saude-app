import { AprhoItem } from './../../model/aprho-item';
import { AgenteRisco } from './../../model/agente-risco';
import { Aprho } from './../../model/aprho';
import { CategoriaRisco } from './../../model/categoria-risco';
import { PossivelDanoSaude } from './../../model/possivel-dano-saude';
import { FonteGeradora } from './../../model/fonte-geradora';


import { GenericBuilder } from './../../generics/generic.builder';
import { AprhoBuilder } from './../aprho/aprho.builder';
import { AgenteRiscoBuilder } from './../agente-risco/agente-risco.builder';
import { CategoriaRiscoBuilder } from './../categoria-risco/categoria-risco.builder';
import { PossivelDanoSaudeBuilder } from './../possivel-dano-saude/possivel-dano-saude.builder';
import { FonteGeradoraBuilder } from './../fonte-geradora/fonte-geradora.builder';




export class AprhoItemBuilder extends GenericBuilder {

    initialize(aprhoItem: AprhoItem) {
        aprhoItem = new AprhoItem();
        aprhoItem.setAprho(new AprhoBuilder().initialize(new Aprho()));
        aprhoItem.setAgenteRisco(new AgenteRiscoBuilder().initialize(new AgenteRisco()));
        aprhoItem.setCategoriaRisco(new CategoriaRiscoBuilder().initialize(new CategoriaRisco()));
        aprhoItem.setPossivelDanoSaude(new PossivelDanoSaudeBuilder().initialize(new PossivelDanoSaude()));
        aprhoItem.setFonteGeradora(new FonteGeradoraBuilder().initialize(new FonteGeradora()));
        return aprhoItem;
    }
    
    clone(aprhoItem: AprhoItem): AprhoItem {
        
        if (aprhoItem === null || aprhoItem === undefined)
            aprhoItem = new AprhoItem();
        
        
        let cloneAprhoItem = new AprhoItem();
        cloneAprhoItem.setId(this.getValue(aprhoItem,"getId"));
        cloneAprhoItem.setVersion(this.getValue(aprhoItem, "getVersion"));    
        
        cloneAprhoItem.setAprho(new AprhoBuilder().clone(this.getValue( aprhoItem, "getAprho" )));
        
        if(this.getValue(aprhoItem, "getMeioPropagacao") == "")
            cloneAprhoItem.setMeioPropagacao(undefined);
        else if (this.getValue(aprhoItem, "getMeioPropagacao") == undefined )
            cloneAprhoItem.setMeioPropagacao("");
        else
            cloneAprhoItem.setMeioPropagacao(this.getValue(aprhoItem, "getMeioPropagacao"));
        
        
        if(this.getValue(aprhoItem, "getMedidaControle") == "")
            cloneAprhoItem.setMedidaControle(undefined);
        else if (this.getValue(aprhoItem, "getMedidaControle") == undefined )
            cloneAprhoItem.setMedidaControle("");
        else
            cloneAprhoItem.setMedidaControle(this.getValue(aprhoItem, "getMedidaControle"));
        
        
        if(this.getValue(aprhoItem, "getAtividade") == "")
            cloneAprhoItem.setAtividade(undefined);
        else if (this.getValue(aprhoItem, "getAtividade") == undefined )
            cloneAprhoItem.setAtividade("");
        else
            cloneAprhoItem.setAtividade(this.getValue(aprhoItem, "getAtividade"));
        
        
        if(this.getValue(aprhoItem, "getLocal") == "")
            cloneAprhoItem.setLocal(undefined);
        else if (this.getValue(aprhoItem, "getLocal") == undefined )
            cloneAprhoItem.setLocal("");
        else
            cloneAprhoItem.setLocal(this.getValue(aprhoItem, "getLocal"));
        
        
        if(this.getValue(aprhoItem, "getFrequencia") == "")
            cloneAprhoItem.setFrequencia(undefined);
        else if (this.getValue(aprhoItem, "getFrequencia") == undefined )
            cloneAprhoItem.setFrequencia("");
        else
            cloneAprhoItem.setFrequencia(this.getValue(aprhoItem, "getFrequencia"));
        
        
        if(this.getValue(aprhoItem, "getAvaliacaoEficacia") == "")
            cloneAprhoItem.setAvaliacaoEficacia(undefined);
        else if (this.getValue(aprhoItem, "getAvaliacaoEficacia") == undefined )
            cloneAprhoItem.setAvaliacaoEficacia("");
        else
            cloneAprhoItem.setAvaliacaoEficacia(this.getValue(aprhoItem, "getAvaliacaoEficacia"));
        
        
        if(this.getValue(aprhoItem, "getDuracao") == "")
            cloneAprhoItem.setDuracao(undefined);
        else if (this.getValue(aprhoItem, "getDuracao") == undefined )
            cloneAprhoItem.setDuracao("");
        else
            cloneAprhoItem.setDuracao(this.getValue(aprhoItem, "getDuracao"));     
        
         
        if (this.getValue(aprhoItem, "getAgenteRisco") !== undefined) { 
            cloneAprhoItem.setAgenteRisco(
                    new AgenteRiscoBuilder().clone(this.getValue(aprhoItem,"getAgenteRisco")));
            if(!this.idGtZero(cloneAprhoItem.getAgenteRisco()))
                cloneAprhoItem.setAgenteRisco(undefined);
        } else {
            cloneAprhoItem.setAgenteRisco(new AgenteRiscoBuilder().initialize(null));
        }
        
        if (this.getValue(aprhoItem, "getFonteGeradora") !== undefined) { 
            cloneAprhoItem.setFonteGeradora(
                    new FonteGeradoraBuilder().clone(this.getValue(aprhoItem,"getFonteGeradora")));
            if(!this.idGtZero(cloneAprhoItem.getFonteGeradora()))
                cloneAprhoItem.setFonteGeradora(undefined);
        } else {
            cloneAprhoItem.setFonteGeradora(new FonteGeradoraBuilder().initialize(null));
        }        
        
        if (this.getValue(aprhoItem, "getCategoriaRisco") !== undefined) { 
            cloneAprhoItem.setCategoriaRisco(
                    new CategoriaRiscoBuilder().clone(this.getValue(aprhoItem,"getCategoriaRisco")));
            if(!this.idGtZero(cloneAprhoItem.getCategoriaRisco()))
                cloneAprhoItem.setCategoriaRisco(undefined);
        } else {
            cloneAprhoItem.setCategoriaRisco(new CategoriaRiscoBuilder().initialize(null));
        }
        
        if (this.getValue(aprhoItem, "getPossivelDanoSaude") !== undefined) { 
            cloneAprhoItem.setPossivelDanoSaude(
                    new PossivelDanoSaudeBuilder().clone(this.getValue(aprhoItem,"getPossivelDanoSaude")));
            if(!this.idGtZero(cloneAprhoItem.getPossivelDanoSaude()))
                cloneAprhoItem.setPossivelDanoSaude(undefined);
        } else {
            cloneAprhoItem.setPossivelDanoSaude(new PossivelDanoSaudeBuilder().initialize(null));
        }
        
        return cloneAprhoItem;
    }
    
    cloneList(aprhoItens: Array<AprhoItem>): Array<AprhoItem> {
        let array:Array<AprhoItem> = new Array<AprhoItem>();
    
        if (aprhoItens !== null && aprhoItens !== undefined) { 
            for (let aprhoItem of aprhoItens) {
                array.push(this.clone(aprhoItem));
            }
        }
        
        return array;
    }
    
    initializeList(aprhoItens: Array<AprhoItem>) {
        
        let array:Array<AprhoItem> = new Array<AprhoItem>();
        
        if(aprhoItens === null || aprhoItens === undefined)
            aprhoItens = new Array<AprhoItem>();
        
        for (let aprhoItem of aprhoItens) {
            array.push(this.initialize(aprhoItem));
        }
        
        return array;
    }
    
}