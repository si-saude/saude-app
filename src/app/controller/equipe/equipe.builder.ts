import { Equipe } from './../../model/equipe';
import { GenericBuilder } from './../../generics/generic.builder';

export class EquipeBuilder extends GenericBuilder {

    initialize( equipe: Equipe ) {
        equipe = new Equipe();
        return equipe;
    }

    initializeList( equipes: Array<Equipe> ) {

        let array: Array<Equipe> = new Array<Equipe>();

        if ( equipes === null || equipes === undefined )
            equipes = new Array<Equipe>();

        for ( let equipe of equipes ) {
            array.push( this.initialize( equipe ) );
        }

        return array;
    }

    clone( equipe: Equipe ): Equipe {
        if ( equipe === null || equipe === undefined )
            equipe = new Equipe();

        let cloneEquipe: Equipe = new Equipe();

        cloneEquipe.setId( this.getValue( equipe, "getId" ) );
        cloneEquipe.setNome( this.getValue( equipe, "getNome" ) );
        cloneEquipe.setAbreviacao( this.getValue( equipe, "getAbreviacao" ) );
        cloneEquipe.setVersion( this.getValue( equipe, "getVersion" ) );

        return cloneEquipe;
    }

    cloneList( equipes: Array<Equipe> ): Array<Equipe> {
        let array: Array<Equipe> = new Array<Equipe>();

        if ( equipes !== null && equipes !== undefined ) {
            for ( let equipe of equipes ) {
                array.push( this.clone( equipe ) );
            }
        }

        return array;
    }


}