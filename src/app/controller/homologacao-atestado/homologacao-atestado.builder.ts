import { HomologacaoAtestado } from './../../model/homologacao-atestado';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class HomologacaoAtestadoBuilder extends GenericBuilder {

    initialize( homologacaoAtestado: HomologacaoAtestado ): HomologacaoAtestado {
        homologacaoAtestado = new HomologacaoAtestado();
        homologacaoAtestado.setProfissional(new ProfissionalSaudeBuilder().initialize(homologacaoAtestado.getProfissional()));
        
        return homologacaoAtestado;
    }

    initializeList( homologacaoAtestados: Array<HomologacaoAtestado> ) {

        let array: Array<HomologacaoAtestado> = new Array<HomologacaoAtestado>();

        if ( homologacaoAtestados === null || homologacaoAtestados === undefined )
            homologacaoAtestados = new Array<HomologacaoAtestado>();

        for ( let homologacaoAtestado of homologacaoAtestados ) {
            array.push( this.initialize( homologacaoAtestado ) );
        }

        return array;
    }
    
    clone( homologacaoAtestado: HomologacaoAtestado ): HomologacaoAtestado {
        let cloneHomologacaoAtestado = new HomologacaoAtestado();

        if ( homologacaoAtestado === null || homologacaoAtestado === undefined )
            homologacaoAtestado = new HomologacaoAtestado();

        cloneHomologacaoAtestado.setId( this.getValue( homologacaoAtestado, "getId" ) );
        cloneHomologacaoAtestado.setVersion( this.getValue( homologacaoAtestado, "getVersion" ) );
        cloneHomologacaoAtestado.setAtestado(this.getValue( homologacaoAtestado, "getAtestado" ))
        cloneHomologacaoAtestado.setDataEntrega(this.getValue( homologacaoAtestado, "getDataEntrega" ));
        cloneHomologacaoAtestado.setDataHomologacao(this.getValue( homologacaoAtestado, "getDataHomologacao" ));
        cloneHomologacaoAtestado.setObservacao(this.getValue( homologacaoAtestado, "getObservacao" ));
        cloneHomologacaoAtestado.setProfissional(this.getValue( homologacaoAtestado, "getProfissional" ));
        cloneHomologacaoAtestado.setStatus(this.getValue( homologacaoAtestado, "getStatus" ));
        
        return cloneHomologacaoAtestado;
    }

    cloneList( homologacaoAtestados: Array<HomologacaoAtestado> ): Array<HomologacaoAtestado> {
        let array: Array<HomologacaoAtestado> = new Array<HomologacaoAtestado>();

        if ( homologacaoAtestados !== null && homologacaoAtestados !== undefined ) {
            for ( let homologacaoAtestado of homologacaoAtestados ) {
                array.push( this.clone( homologacaoAtestado ) );
            }
        }

        return array;
    }


}