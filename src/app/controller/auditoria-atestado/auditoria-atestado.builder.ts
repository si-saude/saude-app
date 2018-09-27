import { AuditoriaAtestado } from './../../model/auditoria-atestado';
import { Atestado } from './../../model/atestado';
import { AtestadoBuilder } from './../atestado/atestado.builder';
import { ItemAuditoriaAtestado } from './../../model/item-auditoria-atestado';
import { ItemAuditoriaAtestadoBuilder } from './../item-auditoria-atestado/item-auditoria-atestado.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AuditoriaAtestadoBuilder extends GenericBuilder {

    initialize( auditoriaAtestado: AuditoriaAtestado ) {
        auditoriaAtestado = new AuditoriaAtestado();

        auditoriaAtestado.setAtestado( new AtestadoBuilder().initialize( null ) );
        auditoriaAtestado.setItemAuditoriaAtestado( new ItemAuditoriaAtestadoBuilder().initialize( null ) );

        return auditoriaAtestado;
    }

    initializeList( auditoriaAtestados: Array<AuditoriaAtestado> ) {

        let array: Array<AuditoriaAtestado> = new Array<AuditoriaAtestado>();

        if ( auditoriaAtestados === null || auditoriaAtestados === undefined )
            auditoriaAtestados = new Array<AuditoriaAtestado>();

        for ( let auditoriaAtestado of auditoriaAtestados ) {
            array.push( this.initialize( auditoriaAtestado ) );
        }

        return array;
    }

    clone( auditoriaAtestado: AuditoriaAtestado ): AuditoriaAtestado {

        if ( auditoriaAtestado === null || auditoriaAtestado === undefined )
            auditoriaAtestado = new AuditoriaAtestado();

        let cloneAuditoriaAtestado = new AuditoriaAtestado();
        cloneAuditoriaAtestado.setId( this.getValue( auditoriaAtestado, "getId" ) );
        cloneAuditoriaAtestado.setConforme( this.getValue( auditoriaAtestado, "getConforme" ) );
        cloneAuditoriaAtestado.setVersion( this.getValue( auditoriaAtestado, "getVersion" ) );

        cloneAuditoriaAtestado.setAtestado( new AtestadoBuilder().clone( this.getValue( auditoriaAtestado, "getAtestado" ) ) );
        cloneAuditoriaAtestado.setItemAuditoriaAtestado( 
                new ItemAuditoriaAtestadoBuilder().clone( this.getValue( auditoriaAtestado, "getItemAuditoriaAtestado" ) ) );

        return cloneAuditoriaAtestado;
    }
    
    cloneList(auditoriaAtestados: Array<AuditoriaAtestado>): Array<AuditoriaAtestado> {
        let array:Array<AuditoriaAtestado> = new Array<AuditoriaAtestado>();
    
        if (auditoriaAtestados !== null && auditoriaAtestados !== undefined) { 
            for (let auditoriaAtestado of auditoriaAtestados) {
                array.push(this.clone(auditoriaAtestado));
            }
        }
        
        return array;
    }

}