import { Aptidao } from './../../model/aptidao';
import { Aso } from './../../model/aso';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { AsoBuilder } from './../aso/aso.builder';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento/grupo-monitoramento.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AptidaoBuilder extends GenericBuilder {

    initialize( aptidao: Aptidao ) {
        aptidao = new Aptidao();
        
        aptidao.setGrupoMonitoramento(new GrupoMonitoramentoBuilder().initialize(new GrupoMonitoramento()));
        aptidao.setAso(new AsoBuilder().initialize(new Aso()));       
        
        return aptidao;
    }

    initializeList( aptidoes: Array<Aptidao> ) {

        let array: Array<Aptidao> = new Array<Aptidao>();

        if ( aptidoes === null || aptidoes === undefined )
            aptidoes = new Array<Aptidao>();

        for ( let aptidao of aptidoes ) {
            array.push( this.initialize( aptidao ) );
        }

        return array;
    }


    clone( aptidao: Aptidao ): Aptidao {
        if ( aptidao === null || aptidao === undefined )
            aptidao = new Aptidao();

        let cloneAptidao = new Aptidao();
        cloneAptidao.setId( this.getValue( aptidao, "getId" ) );
        cloneAptidao.setVersion( this.getValue( aptidao, "getVersion" ) );        
        
        if(this.getValue(aptidao, "getAptidaoAso") == "")
            cloneAptidao.setAptidaoAso(undefined);
        else if (this.getValue(aptidao, "getAptidaoAso") == undefined )
            cloneAptidao.setAptidaoAso("");
        else cloneAptidao.setAptidaoAso(this.getValue( aptidao, "getAptidaoAso" ) );
              
        if (this.getValue(aptidao, "getAso") !== undefined) { 
            cloneAptidao.setAso(new AsoBuilder().clone(this.getValue( aptidao, "getAso" )));
            if(!this.idGtZero(cloneAptidao.getAso()))
                cloneAptidao.setAso(undefined);
        } else cloneAptidao.setAso(new AsoBuilder().initialize(null));
        
        if (this.getValue(aptidao, "getGrupoMonitoramento") !== undefined) { 
            cloneAptidao.setGrupoMonitoramento(new GrupoMonitoramentoBuilder().clone(this.getValue( aptidao, "getGrupoMonitoramento" )));
            if(!this.idGtZero(cloneAptidao.getGrupoMonitoramento()))
                cloneAptidao.setGrupoMonitoramento(undefined);
        } else cloneAptidao.setGrupoMonitoramento(new GrupoMonitoramentoBuilder().initialize(null));
        
        return cloneAptidao;
    }

    cloneList( aptidoes: Array<Aptidao> ): Array<Aptidao> {
        let array: Array<Aptidao> = new Array<Aptidao>();

        if ( aptidoes !== null && aptidoes !== undefined ) {
            for ( let aptidao of aptidoes ) {
                array.push( this.clone( aptidao ) );
            }
        }

        return array;
    }
}