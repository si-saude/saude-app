import { CampoExame } from './../../model/campo-exame';
import { Exame } from './../../model/exame';
import { ExameBuilder } from './../exame/exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class CampoExameBuilder extends GenericBuilder {
    
    initialize( campoExame: CampoExame ) {
        campoExame = new CampoExame();
        
        campoExame.setExame(new Exame());
        
        return campoExame;
    }

    initializeList( campoExames: Array<CampoExame> ) {

        let array: Array<CampoExame> = new Array<CampoExame>();

        if ( campoExames === null || campoExames === undefined )
            campoExames = new Array<CampoExame>();

        for ( let campoExame of campoExames ) {
            array.push( this.initialize( campoExame ) );
        }

        return array;
    }

    clone( campoExame: CampoExame ): CampoExame {

        if ( campoExame === null || campoExame === undefined )
            campoExame = new CampoExame();

        let cloneCampoExame = new CampoExame();
        cloneCampoExame.setId( this.getValue( campoExame, "getId" ) );
        cloneCampoExame.setVersion( this.getValue( campoExame, "getVersion" ) );
        cloneCampoExame.setCodigo( this.getValue( campoExame, "getCodigo" ) );
        cloneCampoExame.setNumeroLinhas( this.getValue( campoExame, "getNumeroLinhas" ) );
        cloneCampoExame.setTitulo( this.getValue( campoExame, "getTitulo" ) );
        
        cloneCampoExame.setExame( new ExameBuilder().clone(this.getValue( campoExame, "getExame" )));

        return cloneCampoExame;
    }

    cloneList( campoExames: Array<CampoExame> ): Array<CampoExame> {
        let array: Array<CampoExame> = new Array<CampoExame>();

        if ( campoExames !== null && campoExames !== undefined ) {
            for ( let campoExame of campoExames ) {
                array.push( this.clone( campoExame ) );
            }
        }

        return array;
    }
}