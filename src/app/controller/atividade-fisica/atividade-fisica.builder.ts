import { AtividadeFisica } from './../../model/atividade-fisica';
import { GenericBuilder } from './../../generics/generic.builder';

export class AtividadeFisicaBuilder extends GenericBuilder {

    initialize(atividadeFisica: AtividadeFisica) {
        atividadeFisica = new AtividadeFisica();
        return atividadeFisica;
    }
    
    initializeList(atividadeFisicas: Array<AtividadeFisica>) {
        
        let array:Array<AtividadeFisica> = new Array<AtividadeFisica>();
        
        if(atividadeFisicas === null || atividadeFisicas === undefined)
            atividadeFisicas = new Array<AtividadeFisica>();
        
        for (let atividadeFisica of atividadeFisicas) {
            array.push(this.initialize(atividadeFisica));
        }
        
        return array;
    }
    
    clone(atividadeFisica: AtividadeFisica): AtividadeFisica {
        
        if (atividadeFisica === null || atividadeFisica === undefined)
            atividadeFisica = new AtividadeFisica();
        
        let cloneAtividadeFisica = new AtividadeFisica();
        cloneAtividadeFisica.setId(this.getValue(atividadeFisica,"getId"));
        cloneAtividadeFisica.setClassificacao(this.getValue(atividadeFisica, "getClassificacao"));
        cloneAtividadeFisica.setDescricao(this.getValue(atividadeFisica, "getDescricao"));
        cloneAtividadeFisica.setDomingo(this.getValue(atividadeFisica, "getDomingo"));
        cloneAtividadeFisica.setMinuto(this.getValue(atividadeFisica, "getMinuto"));
        cloneAtividadeFisica.setObservacao(this.getValue(atividadeFisica, "getObservacao"));
        cloneAtividadeFisica.setQuarta(this.getValue(atividadeFisica, "getQuarta"));
        cloneAtividadeFisica.setQuinta(this.getValue(atividadeFisica, "getQuinta"));
        cloneAtividadeFisica.setSabado(this.getValue(atividadeFisica, "getSabado"));
        cloneAtividadeFisica.setSegunda(this.getValue(atividadeFisica, "getSegunda"));
        cloneAtividadeFisica.setSexta(this.getValue(atividadeFisica, "getSexta"));
        cloneAtividadeFisica.setTerca(this.getValue(atividadeFisica, "getTerca"));
        cloneAtividadeFisica.setTotalMinuto(this.getValue(atividadeFisica, "getTotalMinuto"));
        cloneAtividadeFisica.setVersion(this.getValue(atividadeFisica, "getVersion"));
        return cloneAtividadeFisica;
    }
    
    cloneList(atividadeFisicas: Array<AtividadeFisica>): Array<AtividadeFisica> {
        let array:Array<AtividadeFisica> = new Array<AtividadeFisica>();
        if (atividadeFisicas !== null && atividadeFisicas !== undefined) { 
            for (let atividadeFisica of atividadeFisicas) {
                array.push(this.clone(atividadeFisica));
            }
        }
        
        return array;
    }
    
}