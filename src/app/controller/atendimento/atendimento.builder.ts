import { Atendimento } from './../../model/atendimento';
import { FilaAtendimentoOcupacional } from './../../model/fila-atendimento-ocupacional';
import { FilaAtendimentoOcupacionalBuilder } from './../fila-atendimento-ocupacional/fila-atendimento-ocupacional.builder';
import { FilaEsperaOcupacional } from './../../model/fila-espera-ocupacional';
import { FilaEsperaOcupacionalBuilder } from './../fila-espera-ocupacional/fila-espera-ocupacional.builder';
import { QuestionarioConhecimentoAlimentarBuilder } from './../questionario-conhecimento-alimentar/questionario-conhecimento-alimentar.builder';
import { Tarefa } from './../../model/tarefa';
import { TarefaBuilder } from './../tarefa/tarefa.builder';
import { Aso } from './../../model/aso';
import { AsoBuilder } from './../aso/aso.builder';
import { Triagem } from './../../model/triagem';
import { TriagemBuilder } from './../triagem/triagem.builder';
import { GenericBuilder } from './../../generics/generic.builder';
 
export class AtendimentoBuilder extends GenericBuilder {

    initialize( atendimento: Atendimento ) {
        atendimento = new Atendimento();

        atendimento.setAso(new AsoBuilder().initialize(new Aso()));
        atendimento.setFilaAtendimentoOcupacional(new FilaAtendimentoOcupacionalBuilder().initialize(new FilaAtendimentoOcupacional()));
        atendimento.setFilaEsperaOcupacional(new FilaEsperaOcupacionalBuilder().initialize(new FilaEsperaOcupacional()));
        atendimento.setTarefa(new TarefaBuilder().initialize(new Tarefa()));
        atendimento.setTriagens(new TriagemBuilder().initializeList(new Array<Triagem>()));
        atendimento.setTriagensTodosAtendimentos(new TriagemBuilder().cloneList(new Array<Triagem>()));
        atendimento.setQuestionario(new QuestionarioConhecimentoAlimentarBuilder().initialize(undefined));
        return atendimento;
    }

    initializeList( atendimentos: Array<Atendimento> ) {

        let array: Array<Atendimento> = new Array<Atendimento>();

        if ( atendimentos === null || atendimentos === undefined )
            atendimentos = new Array<Atendimento>();

        for ( let atendimento of atendimentos ) {
            array.push( this.initialize( atendimento ) );
        }

        return array;
    }

    clone( atendimento: Atendimento ): Atendimento {

        if ( atendimento === null || atendimento === undefined )
            atendimento = new Atendimento();
        let cloneAtendimento = new Atendimento();
        cloneAtendimento.setId( this.getValue( atendimento, "getId" ) );
        cloneAtendimento.setVersion( this.getValue( atendimento, "getVersion" ) );
        cloneAtendimento.setAso(new AsoBuilder().clone(this.getValue( atendimento, "getAso" ) ));
        cloneAtendimento.setFilaAtendimentoOcupacional(new FilaAtendimentoOcupacionalBuilder().clone(
                this.getValue( atendimento, "getFilaAtendimentoOcupacional" ) ));
        cloneAtendimento.setFilaEsperaOcupacional(new FilaEsperaOcupacionalBuilder().clone(
                this.getValue( atendimento, "getFilaEsperaOcupacional" ) ));
        cloneAtendimento.setTarefa(new TarefaBuilder().clone(this.getValue( atendimento, "getTarefa" ) ));
        cloneAtendimento.setTriagens(new TriagemBuilder().cloneList(this.getValue( atendimento, "getTriagens" ) ));
        cloneAtendimento.setTriagensTodosAtendimentos(
                new TriagemBuilder().cloneList(this.getValue( atendimento, "getTriagensTodosAtendimentos" ) ));
        cloneAtendimento.setQuestionario(
                new QuestionarioConhecimentoAlimentarBuilder().clone(this.getValue( atendimento, "getQuestionario" )));
        return cloneAtendimento;
    }
    
    cloneList(atendimentos: Array<Atendimento>): Array<Atendimento> {
        let array:Array<Atendimento> = new Array<Atendimento>();
    
        if (atendimentos !== null && atendimentos !== undefined) { 
            for (let atendimento of atendimentos) {
                array.push(this.clone(atendimento));
            }
        }
        
        return array;
    }

}