import { Avaliacao } from './../../model/avaliacao';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento/grupo-monitoramento.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AvaliacaoBuilder extends GenericBuilder {
    
    initialize( avaliacao: Avaliacao ) {
        avaliacao = new Avaliacao();
        avaliacao.setGrupoMonitoramento(new GrupoMonitoramento());
        return avaliacao;
    }
    
    initializeList( avaliacoes: Array<Avaliacao> ) {

        let array: Array<Avaliacao> = new Array<Avaliacao>();

        if ( avaliacoes === null || avaliacoes === undefined )
            avaliacoes = new Array<Avaliacao>();

        for ( let avaliacao of avaliacoes ) {
            array.push( this.initialize( avaliacao ) );
        }

        return array;
    }
    
    clone( avaliacao: Avaliacao ): Avaliacao {

        if ( avaliacao === null || avaliacao === undefined )
            avaliacao = new Avaliacao();
        
        let cloneAvaliacao = new Avaliacao();
        cloneAvaliacao.setId(this.getValue( avaliacao, "getId" ));
        cloneAvaliacao.setVersion(this.getValue( avaliacao, "getVersion" ));
        cloneAvaliacao.setNome(this.getValue( avaliacao, "getNome" ));
        cloneAvaliacao.setAuditoriaAso(this.getValue( avaliacao, "getAuditoriaAso" ));
        cloneAvaliacao.setAuditoriaMedico(this.getValue( avaliacao, "getAuditoriaMedico" ));
        
        cloneAvaliacao.setGrupoMonitoramento(new GrupoMonitoramentoBuilder()
            .clone( this.getValue( avaliacao, "getGrupoMonitoramento" ) ))
        
        return cloneAvaliacao;
    }
    
    cloneList(avaliacoes: Array<Avaliacao>): Array<Avaliacao> {
        let array:Array<Avaliacao> = new Array<Avaliacao>();
    
        if (avaliacoes !== null && avaliacoes !== undefined) { 
            for (let avaliacao of avaliacoes) {
                array.push(this.clone(avaliacao));
            }
        }
        
        return array;
    }
    
}