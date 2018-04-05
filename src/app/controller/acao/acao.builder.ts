import { Acao } from './../../model/acao';
import { Tarefa } from './../../model/tarefa';
import { Triagem } from './../../model/triagem';
import { TarefaBuilder } from './../tarefa/tarefa.builder';
import { Acompanhamento } from './../../model/acompanhamento';
import { AcompanhamentoBuilder } from './../acompanhamento/acompanhamento.builder';
import { TriagemBuilder } from './../triagem/triagem.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AcaoBuilder extends GenericBuilder {

    initialize( acao: Acao ) {
        acao = new Acao();
        
        acao.setTarefa(new TarefaBuilder().initialize(new Tarefa()));
        acao.setAcompanhamentos(new AcompanhamentoBuilder().initializeList(new Array<Acompanhamento>()));
        acao.setTriagem(new Triagem());
        
        return acao;
    }

    initializeList( acoes: Array<Acao> ) {

        let array: Array<Acao> = new Array<Acao>();

        if ( acoes === null || acoes === undefined )
            acoes = new Array<Acao>();

        for ( let acao of acoes ) {
            array.push( this.initialize( acao ) );
        }

        return array;
    }


    clone( acao: Acao ): Acao {
        if ( acao === null || acao === undefined )
            acao = new Acao();

        let cloneAcao = new Acao();
        cloneAcao.setId( this.getValue( acao, "getId" ) );
        cloneAcao.setDetalhe(this.getValue( acao, "getDetalhe" ) );
        cloneAcao.setVersion( this.getValue( acao, "getVersion" ) );
        
        if(this.getValue(acao, "getTipoContato") == "")
            cloneAcao.setTipoContato(undefined);
        else if (this.getValue(acao, "getTipoContato") == undefined )
            cloneAcao.setTipoContato("");
        else cloneAcao.setTipoContato(this.getValue( acao, "getTipoContato" ) );
        
        if(this.getValue(acao, "getTipo") == "")
            cloneAcao.setTipo(undefined);
        else if (this.getValue(acao, "getTipo") == undefined )
            cloneAcao.setTipo("");
        else cloneAcao.setTipo(this.getValue( acao, "getTipo" ) );
        
        if(this.getValue(acao, "getStatus") == "")
            cloneAcao.setStatus(undefined);
        else if (this.getValue(acao, "getStatus") == undefined )
            cloneAcao.setStatus("");
        else cloneAcao.setStatus(this.getValue( acao, "getStatus" ) );
        
        cloneAcao.setTarefa(new TarefaBuilder().clone(this.getValue( acao, "getTarefa" ) ) );
        cloneAcao.setAcompanhamentos(new AcompanhamentoBuilder().cloneList(this.getValue( acao, "getAcompanhamentos" )));
        
        if (this.getValue(acao, "getTriagem") !== undefined) { 
            cloneAcao.setTriagem(new TriagemBuilder().clone(this.getValue( acao, "getTriagem" )));
            if(!this.idGtZero(cloneAcao.getTriagem()))
                cloneAcao.setTriagem(undefined);
        } else cloneAcao.setTriagem(new TriagemBuilder().initialize(null));
        
        return cloneAcao;
    }

    cloneList( acoes: Array<Acao> ): Array<Acao> {
        let array: Array<Acao> = new Array<Acao>();

        if ( acoes !== null && acoes !== undefined ) {
            for ( let acao of acoes ) {
                array.push( this.clone( acao ) );
            }
        }

        return array;
    }
}