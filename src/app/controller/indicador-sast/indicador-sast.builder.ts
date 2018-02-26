import { IndicadorSast } from './../../model/indicador-sast';
import { IndicadorAssociadoSast } from './../../model/indicador-associado-sast';
import { IndicadorAssociadoSastBuilder } from './../indicador-associado-sast/indicador-associado-sast.builder';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorSastBuilder extends GenericBuilder {

    initialize( indicadorSast: IndicadorSast ): IndicadorSast {
        indicadorSast = new IndicadorSast();

        indicadorSast.setEquipe( new EquipeBuilder().initialize( new Equipe() ) );
        indicadorSast.setIndicadorAssociadoSasts( new IndicadorAssociadoSastBuilder().initializeList( new Array<IndicadorAssociadoSast>() ) );

        return indicadorSast;
    }

    initializeList( indicadorSasts: Array<IndicadorSast> ) {

        let array: Array<IndicadorSast> = new Array<IndicadorSast>();

        if ( indicadorSasts === null || indicadorSasts === undefined )
            indicadorSasts = new Array<IndicadorSast>();

        for ( let indicadorSast of indicadorSasts ) {
            array.push( this.initialize( indicadorSast ) );
        }

        return array;
    }

    clone( indicadorSast: IndicadorSast ): IndicadorSast {
        let cloneIndicadorSast = new IndicadorSast();

        if ( indicadorSast === null || indicadorSast === undefined )
            indicadorSast = new IndicadorSast();

        cloneIndicadorSast.setId( this.getValue( indicadorSast, "getId" ) );
        cloneIndicadorSast.setVersion( this.getValue( indicadorSast, "getVersion" ) );
        cloneIndicadorSast.setCodigo( this.getValue( indicadorSast, "getCodigo" ) );
        cloneIndicadorSast.setCodigoExcludente( this.getValue( indicadorSast, "getCodigoExcludente" ) );
        cloneIndicadorSast.setCritico( this.getValue( indicadorSast, "getCritico" ) );
        cloneIndicadorSast.setInativo( this.getValue( indicadorSast, "getInativo" ) );
        cloneIndicadorSast.setIndice0( this.getValue( indicadorSast, "getIndice0" ) );
        cloneIndicadorSast.setIndice1( this.getValue( indicadorSast, "getIndice1" ) );
        cloneIndicadorSast.setIndice2( this.getValue( indicadorSast, "getIndice2" ) );
        cloneIndicadorSast.setIndice3( this.getValue( indicadorSast, "getIndice3" ) );
        cloneIndicadorSast.setIndice4( this.getValue( indicadorSast, "getIndice4" ) );
        cloneIndicadorSast.setNome( this.getValue( indicadorSast, "getNome" ) );
        cloneIndicadorSast.setObrigatorio( this.getValue( indicadorSast, "getObrigatorio" ) );

        cloneIndicadorSast.setIndicadorAssociadoSasts(
            new IndicadorAssociadoSastBuilder().cloneList( this.getValue( indicadorSast, "getIndicadorAssociadoSasts" ) ));

        if ( this.getValue( indicadorSast, "getEquipe" ) !== undefined ) {
            cloneIndicadorSast.setEquipe(
                new EquipeBuilder().clone( this.getValue( indicadorSast, "getEquipe" ) ) );
            if ( !this.idGtZero( cloneIndicadorSast.getEquipe() ) )
                cloneIndicadorSast.setEquipe( undefined );
        } else {
            cloneIndicadorSast.setEquipe( new EquipeBuilder().initialize( null ) );
        }

        return cloneIndicadorSast;
    }

    cloneList( indicadorSasts: Array<IndicadorSast> ) {

        if ( indicadorSasts === null || indicadorSasts === undefined )
            indicadorSasts = new Array<IndicadorSast>();

        let array: Array<IndicadorSast> = new Array<IndicadorSast>();

        for ( let indicadorSast of indicadorSasts ) {
            array.push( this.clone( indicadorSast ) );
        }

        return array;
    }

}