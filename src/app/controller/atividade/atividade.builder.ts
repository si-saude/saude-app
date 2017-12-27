import { Atividade } from './../../model/atividade';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { Servico } from './../../model/servico';
import { ServicoBuilder } from './../servico/servico.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AtividadeBuilder extends GenericBuilder {

    initialize( atividade: Atividade ) {
        atividade = new Atividade();

        atividade.setEquipe( new EquipeBuilder().initialize( atividade.getEquipe() ) );
        atividade.setServico( new Servico() );

        return atividade;
    }

    initializeList( atividades: Array<Atividade> ) {

        let array: Array<Atividade> = new Array<Atividade>();

        if ( atividades === null || atividades === undefined )
            atividades = new Array<Atividade>();

        for ( let atividade of atividades ) {
            array.push( this.initialize( atividade ) );
        }

        return array;
    }

    clone( atividade: Atividade ): Atividade {

        if ( atividade === null || atividade === undefined )
            atividade = new Atividade();

        let cloneAtividade = new Atividade();
        cloneAtividade.setId( this.getValue( atividade, "getId" ) );
        cloneAtividade.setTempoMedio( this.getValue( atividade, "getTempoMedio" ) );
        cloneAtividade.setVersion( this.getValue( atividade, "getVersion" ) );

        cloneAtividade.setEquipe( new EquipeBuilder().clone( this.getValue( atividade, "getEquipe" ) ) );
        cloneAtividade.setServico( new ServicoBuilder().clone( this.getValue( atividade, "getServico" ) ) );

        return cloneAtividade;
    }
    
    cloneList(atividades: Array<Atividade>): Array<Atividade> {
        let array:Array<Atividade> = new Array<Atividade>();
    
        if (atividades !== null && atividades !== undefined) { 
            for (let atividade of atividades) {
                array.push(this.clone(atividade));
            }
        }
        
        return array;
    }

}