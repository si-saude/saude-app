import { FilaAtendimentoOcupacional } from './../../model/fila-atendimento-ocupacional';
import { Localizacao } from './../../model/localizacao';
import { LocalizacaoBuilder } from './../localizacao/localizacao.builder';
import { Profissional } from './../../model/profissional';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { FilaAtendimentoOcupacionalAtualizacao } from './../../model/fila-atendimento-ocupacional-atualizacao';
import { FilaAtendimentoOcupacionalAtualizacaoBuilder } from './../fila-atendimento-ocupacional-atualizacao/fila-atendimento-ocupacional-atualizacao.builder';
import { GenericBuilder } from './../../generics/generic.builder';
  
export class FilaAtendimentoOcupacionalBuilder extends GenericBuilder {

    initialize( filaAtendimentoOcupacional: FilaAtendimentoOcupacional ) {
        filaAtendimentoOcupacional = new FilaAtendimentoOcupacional();
        
        filaAtendimentoOcupacional.setLocalizacao(new LocalizacaoBuilder().initialize(new Localizacao()));
        filaAtendimentoOcupacional.setProfissional(new ProfissionalSaudeBuilder().initialize(new Profissional()));
        filaAtendimentoOcupacional.setAtualizacoes(new FilaAtendimentoOcupacionalAtualizacaoBuilder().initializeList(
                new Array<FilaAtendimentoOcupacionalAtualizacao>()));
        
        return filaAtendimentoOcupacional;
    }

    initializeList( filaAtendimentoOcupacionais: Array<FilaAtendimentoOcupacional> ) {

        let array: Array<FilaAtendimentoOcupacional> = new Array<FilaAtendimentoOcupacional>();

        if ( filaAtendimentoOcupacionais === null || filaAtendimentoOcupacionais === undefined )
            filaAtendimentoOcupacionais = new Array<FilaAtendimentoOcupacional>();

        for ( let filaAtendimentoOcupacional of filaAtendimentoOcupacionais ) {
            array.push( this.initialize( filaAtendimentoOcupacional ) );
        }

        return array;
    }

    clone( filaAtendimentoOcupacional: FilaAtendimentoOcupacional ): FilaAtendimentoOcupacional {

        if ( filaAtendimentoOcupacional === null || filaAtendimentoOcupacional === undefined )
            filaAtendimentoOcupacional = new FilaAtendimentoOcupacional();

        let cloneFilaAtendimentoOcupacional = new FilaAtendimentoOcupacional();
        cloneFilaAtendimentoOcupacional.setId( this.getValue( filaAtendimentoOcupacional, "getId" ) );
        cloneFilaAtendimentoOcupacional.setVersion( this.getValue( filaAtendimentoOcupacional, "getVersion" ) );
        cloneFilaAtendimentoOcupacional.setAtualizacao(this.getValue( filaAtendimentoOcupacional, "getAtualizacao" ) );
        cloneFilaAtendimentoOcupacional.setFim(this.getValue( filaAtendimentoOcupacional, "getFim" ) );
        cloneFilaAtendimentoOcupacional.setInicio(this.getValue( filaAtendimentoOcupacional, "getInicio" ) );
        
        if(this.getValue(filaAtendimentoOcupacional, "getStatus") == "")
            cloneFilaAtendimentoOcupacional.setStatus(undefined);
        else if (this.getValue(filaAtendimentoOcupacional, "getStatus") == undefined )
            cloneFilaAtendimentoOcupacional.setStatus("");
        else
            cloneFilaAtendimentoOcupacional.setStatus(this.getValue(filaAtendimentoOcupacional, "getStatus"));
        
        cloneFilaAtendimentoOcupacional.setAtualizacoes(new FilaAtendimentoOcupacionalAtualizacaoBuilder().cloneList(
                this.getValue( filaAtendimentoOcupacional, "getAtualizacoes" ) ));
        cloneFilaAtendimentoOcupacional.setLocalizacao(new LocalizacaoBuilder().clone(
                this.getValue( filaAtendimentoOcupacional, "getLocalizacao" ) ));
        cloneFilaAtendimentoOcupacional.setProfissional(new ProfissionalSaudeBuilder().clone(
                this.getValue( filaAtendimentoOcupacional, "getProfissional" ) ));
        
        return cloneFilaAtendimentoOcupacional;
    }
    
    cloneList(filaAtendimentoOcupacionais: Array<FilaAtendimentoOcupacional>): Array<FilaAtendimentoOcupacional> {
        let array:Array<FilaAtendimentoOcupacional> = new Array<FilaAtendimentoOcupacional>();
    
        if (filaAtendimentoOcupacionais !== null && filaAtendimentoOcupacionais !== undefined) { 
            for (let filaAtendimentoOcupacional of filaAtendimentoOcupacionais) {
                array.push(this.clone(filaAtendimentoOcupacional));
            }
        }
        
        return array;
    }

}