import { RequisitoAso } from './../../model/requisito-aso';
import { GenericBuilder } from './../../generics/generic.builder';

export class RequisitoAsoBuilder extends GenericBuilder {

    initialize( requisito: RequisitoAso ) {
        requisito = new RequisitoAso();
        return requisito;
    }

    initializeList( requisitosAso: Array<RequisitoAso> ) {

        let array: Array<RequisitoAso> = new Array<RequisitoAso>();

        if ( requisitosAso === null || requisitosAso === undefined )
            requisitosAso = new Array<RequisitoAso>();

        for ( let requisitoAso of requisitosAso ) {
            array.push( this.initialize( requisitoAso ) );
        }

        return array;
    }


    clone( requisito: RequisitoAso ): RequisitoAso {
        if ( requisito === null || requisito === undefined )
            requisito = new RequisitoAso();

        let cloneRequisito = new RequisitoAso();
        cloneRequisito.setId( this.getValue( requisito, "getId" ) );
        cloneRequisito.setConteudo( this.getValue( requisito, "getConteudo" ) );
        cloneRequisito.setConforme( this.getValue( requisito, "getConforme" ) );
        cloneRequisito.setVersion( this.getValue( requisito, "getVersion" ) );
        return cloneRequisito;
    }

    cloneList( requisitosAso: Array<RequisitoAso> ): Array<RequisitoAso> {
        let array: Array<RequisitoAso> = new Array<RequisitoAso>();

        if ( requisitosAso !== null && requisitosAso !== undefined ) {
            for ( let requisitoAso of requisitosAso ) {
                array.push( this.clone( requisitoAso ) );
            }
        }

        return array;
    }
}