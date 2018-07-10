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
        cloneAprhoItem.setMeioPropagacao(this.getValue(aprhoItem, "getMeioPropagacao"));
        cloneAprhoItem.setMedidaControle(this.getValue(aprhoItem, "getMedidaControle"));        
        cloneAprhoItem.setAtividade(this.getValue(aprhoItem, "getAtividade"));
        cloneAprhoItem.setLocal(this.getValue(aprhoItem, "getLocal"));
        cloneAprhoItem.setAvaliacaoEficacia(this.getValue(aprhoItem, "getAvaliacaoEficacia"));
        cloneAprhoItem.setFrequencia(this.getValue(aprhoItem, "getFrequencia"));
        cloneAprhoItem.setDuracao(this.getValue(aprhoItem, "getDuracao"));
        cloneAprhoItem.setVersion(this.getValue(aprhoItem, "getVersion"));
        cloneAprhoItem.setFonteGeradora(new FonteGeradoraBuilder().clone(this.getValue( aprhoItem, "getFonteGeradora" )));
        cloneAprhoItem.setAprho(new AprhoBuilder().clone(this.getValue( aprhoItem, "getAprho" )));
        cloneAprhoItem.setAgenteRisco(new AgenteRiscoBuilder().clone(this.getValue( aprhoItem, "getAgenteRisco" )));
        cloneAprhoItem.setCategoriaRisco(new CategoriaRiscoBuilder().clone(this.getValue( aprhoItem, "getCategoriaRisco" )));
        cloneAprhoItem.setPossivelDanoSaude(new PossivelDanoSaudeBuilder().clone(this.getValue( aprhoItem, "getPossivelDanoSaude" )));
        
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