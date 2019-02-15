import { AvaliacaoFisicaAtividadeFisica } from './../../model/avaliacao-fisica-atividade-fisica';
import { AvaliacaoFisica } from './../../model/avaliacao-fisica';
import { AtividadeFisica } from './../../model/atividade-fisica';
import { AtividadeFisicaBuilder } from './../atividade-fisica/atividade-fisica.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AvaliacaoFisicaAtividadeFisicaBuilder extends GenericBuilder {
    
    initialize( avaliacaoFisicaAtividadeFisica: AvaliacaoFisicaAtividadeFisica ) {
        avaliacaoFisicaAtividadeFisica = new AvaliacaoFisicaAtividadeFisica();
        avaliacaoFisicaAtividadeFisica.setAtividadeFisica(new AtividadeFisicaBuilder().initialize(null));
        avaliacaoFisicaAtividadeFisica.setAvaliacaoFisica(new AvaliacaoFisica());
        return avaliacaoFisicaAtividadeFisica;
    }
    
    initializeList( avaliacaoFisicaAtividadeFisicas: Array<AvaliacaoFisicaAtividadeFisica> ) {

        let array: Array<AvaliacaoFisicaAtividadeFisica> = new Array<AvaliacaoFisicaAtividadeFisica>();

        if ( avaliacaoFisicaAtividadeFisicas === null || avaliacaoFisicaAtividadeFisicas === undefined )
            avaliacaoFisicaAtividadeFisicas = new Array<AvaliacaoFisicaAtividadeFisica>();

        for ( let avaliacaoFisicaAtividadeFisica of avaliacaoFisicaAtividadeFisicas ) {
            array.push( this.initialize( avaliacaoFisicaAtividadeFisica ) );
        }

        return array;
    }
    
    clone( avaliacaoFisicaAtividadeFisica: AvaliacaoFisicaAtividadeFisica ): AvaliacaoFisicaAtividadeFisica{

        if ( avaliacaoFisicaAtividadeFisica === null || avaliacaoFisicaAtividadeFisica === undefined )
            avaliacaoFisicaAtividadeFisica = new AvaliacaoFisicaAtividadeFisica();
        
        let cloneAvaliacaoFisicaAtividadeFisica = new AvaliacaoFisicaAtividadeFisica();
        cloneAvaliacaoFisicaAtividadeFisica.setId(this.getValue( avaliacaoFisicaAtividadeFisica, "getId" ));
        cloneAvaliacaoFisicaAtividadeFisica.setIndex(this.getValue( avaliacaoFisicaAtividadeFisica, "getIndex" ));
        cloneAvaliacaoFisicaAtividadeFisica.setVersion(this.getValue( avaliacaoFisicaAtividadeFisica, "getVersion" ));
        cloneAvaliacaoFisicaAtividadeFisica.setClassificacao(this.getValue( avaliacaoFisicaAtividadeFisica, "getClassificacao"));
        cloneAvaliacaoFisicaAtividadeFisica.setDomingo(this.getValue( avaliacaoFisicaAtividadeFisica, "getDomingo"));
        cloneAvaliacaoFisicaAtividadeFisica.setMinuto(this.getValue( avaliacaoFisicaAtividadeFisica, "getMinuto"));
        cloneAvaliacaoFisicaAtividadeFisica.setObservacao(this.getValue( avaliacaoFisicaAtividadeFisica, "getObservacao"));
        cloneAvaliacaoFisicaAtividadeFisica.setQuarta(this.getValue( avaliacaoFisicaAtividadeFisica, "getQuarta"));
        cloneAvaliacaoFisicaAtividadeFisica.setQuinta(this.getValue( avaliacaoFisicaAtividadeFisica, "getQuinta"));
        cloneAvaliacaoFisicaAtividadeFisica.setSabado(this.getValue( avaliacaoFisicaAtividadeFisica, "getSabado"));
        cloneAvaliacaoFisicaAtividadeFisica.setSegunda(this.getValue( avaliacaoFisicaAtividadeFisica, "getSegunda"));
        cloneAvaliacaoFisicaAtividadeFisica.setSexta(this.getValue( avaliacaoFisicaAtividadeFisica, "getSexta"));
        cloneAvaliacaoFisicaAtividadeFisica.setTerca(this.getValue( avaliacaoFisicaAtividadeFisica, "getTerca"));
        cloneAvaliacaoFisicaAtividadeFisica.setTipo(this.getValue( avaliacaoFisicaAtividadeFisica, "getTipo"));
        cloneAvaliacaoFisicaAtividadeFisica.setTotalMinuto(this.getValue( avaliacaoFisicaAtividadeFisica, "getTotalMinuto"));
               
        if (this.getValue(avaliacaoFisicaAtividadeFisica, "getAtividadeFisica") !== undefined) { 
            cloneAvaliacaoFisicaAtividadeFisica.setAtividadeFisica(
                    new AtividadeFisicaBuilder().clone(this.getValue(avaliacaoFisicaAtividadeFisica,"getAtividadeFisica")));
            if(!this.idGtZero(cloneAvaliacaoFisicaAtividadeFisica.getAtividadeFisica()))
                cloneAvaliacaoFisicaAtividadeFisica.setAvaliacaoFisica(undefined);
        } else {
            cloneAvaliacaoFisicaAtividadeFisica.setAtividadeFisica(new AtividadeFisicaBuilder().initialize(null));
        }
        
        return cloneAvaliacaoFisicaAtividadeFisica;
    }
    
    cloneList(avaliacaoFisicaAtividadeFisicas: Array<AvaliacaoFisicaAtividadeFisica>): Array<AvaliacaoFisicaAtividadeFisica> {
        let array:Array<AvaliacaoFisicaAtividadeFisica> = new Array<AvaliacaoFisicaAtividadeFisica>();
    
        if (avaliacaoFisicaAtividadeFisicas !== null && avaliacaoFisicaAtividadeFisicas !== undefined) { 
            for (let avaliacaoFisicaAtividadeFisica of avaliacaoFisicaAtividadeFisicas) {
                array.push(this.clone(avaliacaoFisicaAtividadeFisica));
            }
        }
        
        return array;
    }
    
}