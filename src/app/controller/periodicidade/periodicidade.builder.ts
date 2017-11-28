import { Periodicidade } from './../../model/periodicidade';
import { GenericBuilder } from './../../generics/generic.builder';

export class PeriodicidadeBuilder extends GenericBuilder {

    initialize( periodicidade: Periodicidade ): Periodicidade {
        periodicidade = new Periodicidade();

        return periodicidade;
    }
    
    initializeList( periodicidades: Array<Periodicidade> ) {

        let array: Array<Periodicidade> = new Array<Periodicidade>();

        if ( periodicidades === null || periodicidades === undefined )
            periodicidades = new Array<Periodicidade>();

        for ( let periodicidade of periodicidades ) {
            array.push( this.initialize( periodicidade ) );
        }

        return array;
    }
    
    clone( periodicidade: Periodicidade ): Periodicidade {
        let clonePeriodicidade = new Periodicidade();

        if ( periodicidade === null || periodicidade === undefined )
            periodicidade = new Periodicidade();

        clonePeriodicidade.setId( this.getValue( periodicidade, "getId" ) );
        clonePeriodicidade.setVersion( this.getValue( periodicidade, "getVersion" ) );
        clonePeriodicidade.setDescricao( this.getValue( periodicidade, "getDescricao" ) );
        clonePeriodicidade.setMeses( this.getValue( periodicidade, "getMeses" ) );

        return clonePeriodicidade;
    }

    cloneList( periodicidades: Array<Periodicidade> ): Array<Periodicidade> {
        let array: Array<Periodicidade> = new Array<Periodicidade>();

        if ( periodicidades !== null && periodicidades !== undefined ) {
            for ( let periodicidade of periodicidades ) {
                array.push( this.clone( periodicidade ) );
            }
        }

        return array;
    }

}