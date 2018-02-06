import { Tarefa } from './../../model/tarefa';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { Profissional } from './../../model/profissional';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { GenericBuilder } from './../../generics/generic.builder';
import { Servico } from './../../model/servico';
import { ServicoBuilder } from './../servico/servico.builder';

export class TarefaBuilder extends GenericBuilder {

    initialize( tarefa: Tarefa ) {
        tarefa = new Tarefa();

        tarefa.setCliente( new EmpregadoBuilder().initialize( new Empregado() ) );
        tarefa.setEquipe( new EquipeBuilder().initialize( new Equipe() ) );
        tarefa.setResponsavel( new ProfissionalSaudeBuilder().initialize( new Profissional() ) );
        tarefa.setServico( new ServicoBuilder().initialize( new Servico() ) );

        return tarefa;
    }

    initializeList( tarefas: Array<Tarefa> ) {

        let array: Array<Tarefa> = new Array<Tarefa>();

        if ( tarefas === null || tarefas === undefined )
            tarefas = new Array<Tarefa>();

        for ( let tarefa of tarefas ) {
            array.push( this.initialize( tarefa ) );
        }

        return array;
    }

    clone( tarefa: Tarefa ): Tarefa {

        if ( tarefa === null || tarefa === undefined )
            tarefa = new Tarefa();

        let cloneTarefa = new Tarefa();
        cloneTarefa.setId( this.getValue( tarefa, "getId" ) );
        cloneTarefa.setVersion( this.getValue( tarefa, "getVersion" ) );
        cloneTarefa.setAtualizacao( this.getValue( tarefa, "getAtualizacao" ) );
        cloneTarefa.setInicio( this.getValue( tarefa, "getInicio" ) );
        cloneTarefa.setFim( this.getValue( tarefa, "getFim" ) );
        cloneTarefa.setHorario( this.getValue( tarefa, "getHorario" ) );

        if ( this.getValue( tarefa, "getStatus" ) == "" )
            cloneTarefa.setStatus( undefined );
        else if ( this.getValue( tarefa, "getStatus" ) == undefined )
            cloneTarefa.setStatus( "" );
        else
            cloneTarefa.setStatus( this.getValue( tarefa, "getStatus" ) );

        cloneTarefa.setCliente( new EmpregadoBuilder().clone( this.getValue( tarefa, "getCliente" ) ) );
        cloneTarefa.setEquipe( new EquipeBuilder().clone( this.getValue( tarefa, "getEquipe" ) ) );
        cloneTarefa.setServico( new ServicoBuilder().clone( this.getValue( tarefa, "getServico" ) ) );

        if ( this.getValue( tarefa, "getResponsavel" ) !== undefined ) {
            cloneTarefa.setResponsavel(
                new ProfissionalSaudeBuilder().clone( this.getValue( tarefa, "getResponsavel" ) ) );
            if ( !this.idGtZero( cloneTarefa.getResponsavel() ) )
                cloneTarefa.setResponsavel( undefined );
        } else {
            cloneTarefa.setResponsavel( new ProfissionalSaudeBuilder().initialize( null ) );
        }

        return cloneTarefa;
    }

    cloneList( tarefas: Array<Tarefa> ): Array<Tarefa> {
        let array: Array<Tarefa> = new Array<Tarefa>();

        if ( tarefas !== null && tarefas !== undefined ) {
            for ( let tarefa of tarefas ) {
                array.push( this.clone( tarefa ) );
            }
        }

        return array;
    }

}