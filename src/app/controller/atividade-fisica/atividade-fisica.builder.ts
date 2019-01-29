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
        cloneAtividadeFisica.setDescricao(this.getValue(atividadeFisica, "getDescricao"));
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