import { Ghee } from './../../model/ghee';
import { GenericBuilder } from './../../generics/generic.builder';

export class GheeBuilder extends GenericBuilder {

    initialize( ghee: Ghee ): Ghee {
        ghee = new Ghee();

        return ghee;
    }

    initializeList( ghees: Array<Ghee> ) {

        let array: Array<Ghee> = new Array<Ghee>();

        if ( ghees === null || ghees === undefined )
            ghees = new Array<Ghee>();

        for ( let ghee of ghees ) {
            array.push( this.initialize( ghee ) );
        }

        return array;
    }
    
    clone( ghee: Ghee ): Ghee {
        let cloneGhee = new Ghee();

        if ( ghee === null || ghee === undefined )
            ghee = new Ghee();

        cloneGhee.setId( this.getValue( ghee, "getId" ) );
        cloneGhee.setVersion( this.getValue( ghee, "getVersion" ) );
        cloneGhee.setNome( this.getValue( ghee, "getNome" ) );
        cloneGhee.setCodigo( this.getValue( ghee, "getCodigo" ) );
        cloneGhee.setDescricao( this.getValue( ghee, "getDescricao" ) );
        cloneGhee.setDataCriacao( this.getValue( ghee, "getDataCriacao" ) );
        cloneGhee.setDataDesativacao( this.getValue( ghee, "getDataDesativacao" ) );

        return cloneGhee;
    }

    cloneList( ghees: Array<Ghee> ): Array<Ghee> {
        let array: Array<Ghee> = new Array<Ghee>();

        if ( ghees !== null && ghees !== undefined ) {
            for ( let ghee of ghees ) {
                array.push( this.clone( ghee ) );
            }
        }

        return array;
    }


}