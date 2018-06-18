import { AgenteRisco } from './../../model/agente-risco';
import { GenericBuilder } from './../../generics/generic.builder';

export class AgenteRiscoBuilder extends GenericBuilder {

    initialize(agenteRisco: AgenteRisco) {
        agenteRisco = new AgenteRisco();
        return agenteRisco;
    }
    
    clone(agenteRisco: AgenteRisco): AgenteRisco {
        
        if (agenteRisco === null || agenteRisco === undefined)
            agenteRisco = new AgenteRisco();
        
        let cloneAgenteRisco = new AgenteRisco();
        cloneAgenteRisco.setId(this.getValue(agenteRisco,"getId"));
        cloneAgenteRisco.setDescricao(this.getValue(agenteRisco, "getDescricao"));
        cloneAgenteRisco.setCategoriaAgenteRisco(this.getValue(agenteRisco, "getCategoriaAgenteRisco"));
        cloneAgenteRisco.setVersion(this.getValue(agenteRisco, "getVersion"));
        return cloneAgenteRisco;
    }
    
    cloneList( agenteRiscos: Array<AgenteRisco> ): Array<AgenteRisco> {
        let array: Array<AgenteRisco> = new Array<AgenteRisco>();

        if ( agenteRiscos !== null && agenteRiscos !== undefined ) {
            for ( let agenteRisco of agenteRiscos ) {
                array.push( this.clone( agenteRisco ) );
            }
        }
        return array;
    }
}