import { FilaEsperaOcupacional } from './../../model/fila-espera-ocupacional';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { Localizacao } from './../../model/localizacao';
import { LocalizacaoBuilder } from './../localizacao/localizacao.builder';
import { Servico } from './../../model/servico';
import { ServicoBuilder } from './../servico/servico.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class FilaEsperaOcupacionalBuilder extends GenericBuilder {

    initialize( filaEsperaOcupacional: FilaEsperaOcupacional ) {
        filaEsperaOcupacional = new FilaEsperaOcupacional();

        filaEsperaOcupacional.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        filaEsperaOcupacional.setLocalizacao(new LocalizacaoBuilder().initialize(new Localizacao()));
        filaEsperaOcupacional.setServico(new ServicoBuilder().initialize(new Servico()));
        
        return filaEsperaOcupacional;
    }

    initializeList( filaEsperaOcupacionais: Array<FilaEsperaOcupacional> ) {

        let array: Array<FilaEsperaOcupacional> = new Array<FilaEsperaOcupacional>();

        if ( filaEsperaOcupacionais === null || filaEsperaOcupacionais === undefined )
            filaEsperaOcupacionais = new Array<FilaEsperaOcupacional>();

        for ( let filaEsperaOcupacional of filaEsperaOcupacionais ) {
            array.push( this.initialize( filaEsperaOcupacional ) );
        }

        return array;
    }

    clone( filaEsperaOcupacional: FilaEsperaOcupacional ): FilaEsperaOcupacional {

        if ( filaEsperaOcupacional === null || filaEsperaOcupacional === undefined )
            filaEsperaOcupacional = new FilaEsperaOcupacional();

        let cloneFilaEsperaOcupacional = new FilaEsperaOcupacional();
        cloneFilaEsperaOcupacional.setId( this.getValue( filaEsperaOcupacional, "getId" ) );
        cloneFilaEsperaOcupacional.setVersion( this.getValue( filaEsperaOcupacional, "getVersion" ) );
        cloneFilaEsperaOcupacional.setAtualizacao(this.getValue( filaEsperaOcupacional, "getAtualizacao" ) );
        cloneFilaEsperaOcupacional.setHorarioCheckin(this.getValue( filaEsperaOcupacional, "getHorarioCheckin" ) );
        cloneFilaEsperaOcupacional.setSaida(this.getValue( filaEsperaOcupacional, "getSaida" ) );
        
        if(this.getValue(filaEsperaOcupacional, "getStatus") == "")
            cloneFilaEsperaOcupacional.setStatus(undefined);
        else if (this.getValue(filaEsperaOcupacional, "getStatus") == undefined )
            cloneFilaEsperaOcupacional.setStatus("");
        else
            cloneFilaEsperaOcupacional.setStatus(this.getValue(filaEsperaOcupacional, "getStatus"));
        
        cloneFilaEsperaOcupacional.setEmpregado(new EmpregadoBuilder().clone(this.getValue(filaEsperaOcupacional, "getEmpregado")));
        cloneFilaEsperaOcupacional.setLocalizacao(new LocalizacaoBuilder().clone(this.getValue(filaEsperaOcupacional, "getLocalizacao")));
        cloneFilaEsperaOcupacional.setServico(new ServicoBuilder().clone(this.getValue(filaEsperaOcupacional, "getServico")));
        
        return cloneFilaEsperaOcupacional;
    }
    
    cloneList(filaEsperaOcupacionais: Array<FilaEsperaOcupacional>): Array<FilaEsperaOcupacional> {
        let array:Array<FilaEsperaOcupacional> = new Array<FilaEsperaOcupacional>();
    
        if (filaEsperaOcupacionais !== null && filaEsperaOcupacionais !== undefined) { 
            for (let filaEsperaOcupacional of filaEsperaOcupacionais) {
                array.push(this.clone(filaEsperaOcupacional));
            }
        }
        
        return array;
    }

}