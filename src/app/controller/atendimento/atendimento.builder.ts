import { Atendimento } from './../../model/atendimento';
import { FilaAtendimentoOcupacional } from './../../model/fila-atendimento-ocupacional';
import { FilaAtendimentoOcupacionalBuilder } from './../fila-atendimento-ocupacional/fila-atendimento-ocupacional.builder';
import { FilaEsperaOcupacional } from './../../model/fila-espera-ocupacional';
import { FilaEsperaOcupacionalBuilder } from './../fila-espera-ocupacional/fila-espera-ocupacional.builder';
import { RegraAtendimento } from './../../model/regra-atendimento';
import { RegraAtendimentoBuilder } from './../regra-atendimento/regra-atendimento.builder';
import { Tarefa } from './../../model/tarefa';
import { TarefaBuilder } from './../tarefa/tarefa.builder';
import { Aso } from './../../model/aso';
import { AsoBuilder } from './../aso/aso.builder';
import { GenericBuilder } from './../../generics/generic.builder';
 
export class AtendimentoBuilder extends GenericBuilder {

    initialize( atendimento: Atendimento ) {
        atendimento = new Atendimento();

        atendimento.setAso(new AsoBuilder().initialize(new Aso()));
        atendimento.setFilaAtendimentoOcupacional(new FilaAtendimentoOcupacionalBuilder().initialize(new FilaAtendimentoOcupacional()));
        atendimento.setFilaEsperaOcupacional(new FilaEsperaOcupacionalBuilder().initialize(new FilaEsperaOcupacional()));
        atendimento.setRegra(new RegraAtendimentoBuilder().initialize(new RegraAtendimento()));
        atendimento.setTarefa(new TarefaBuilder().initialize(new Tarefa()));
        
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
        cloneAtendimento.setRegra(new RegraAtendimentoBuilder().clone(this.getValue( atendimento, "getRegra" ) ));
        cloneAtendimento.setTarefa(new TarefaBuilder().clone(this.getValue( atendimento, "getTarefa" ) ));
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