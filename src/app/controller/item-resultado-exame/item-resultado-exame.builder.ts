import { ItemResultadoExame } from './../../model/item-resultado-exame';
import { ResultadoExame } from './../../model/resultado-exame';
import { ResultadoExameBuilder } from './../resultado-exame/resultado-exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ItemResultadoExameBuilder extends GenericBuilder {
    
    initialize( itemResultadoExame: ItemResultadoExame ) {
        itemResultadoExame = new ItemResultadoExame();
        
        itemResultadoExame.setResultadoExame(new ResultadoExame());
        
        return itemResultadoExame;
    }

    initializeList( itemResultadoExames: Array<ItemResultadoExame> ) {

        let array: Array<ItemResultadoExame> = new Array<ItemResultadoExame>();

        if ( itemResultadoExames === null || itemResultadoExames === undefined )
            itemResultadoExames = new Array<ItemResultadoExame>();

        for ( let itemResultadoExame of itemResultadoExames ) {
            array.push( this.initialize( itemResultadoExame ) );
        }

        return array;
    }

    clone( itemResultadoExame: ItemResultadoExame ): ItemResultadoExame {

        if ( itemResultadoExame === null || itemResultadoExame === undefined )
            itemResultadoExame = new ItemResultadoExame();

        let cloneItemResultadoExame = new ItemResultadoExame();
        cloneItemResultadoExame.setId( this.getValue( itemResultadoExame, "getId" ) );
        cloneItemResultadoExame.setVersion( this.getValue( itemResultadoExame, "getVersion" ) );
        cloneItemResultadoExame.setCodigo( this.getValue( itemResultadoExame, "getCodigo" ) );
        cloneItemResultadoExame.setResultado( this.getValue( itemResultadoExame, "getResultado" ) );
        cloneItemResultadoExame.setTitulo( this.getValue( itemResultadoExame, "getTitulo" ) );
        
        cloneItemResultadoExame.setResultadoExame( 
                new ResultadoExameBuilder().clone(this.getValue( itemResultadoExame, "getResultadoExame" ) ));
        
        return cloneItemResultadoExame;
    }

    cloneList( itemResultadoExames: Array<ItemResultadoExame> ): Array<ItemResultadoExame> {
        let array: Array<ItemResultadoExame> = new Array<ItemResultadoExame>();

        if ( itemResultadoExames !== null && itemResultadoExames !== undefined ) {
            for ( let itemResultadoExame of itemResultadoExames ) {
                array.push( this.clone( itemResultadoExame ) );
            }
        }

        return array;
    }
}
