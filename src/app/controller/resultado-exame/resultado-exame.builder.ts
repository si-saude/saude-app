import { EmpregadoConvocacaoBuilder } from './../empregado-convocacao/empregado-convocacao.builder';
import { ItemResultadoExameBuilder } from './../item-resultado-exame/item-resultado-exame.builder';
import { ItemResultadoExame } from './../../model/item-resultado-exame';
import { EmpregadoConvocacao } from './../../model/empregado-convocacao';
import { ResultadoExame } from './../../model/resultado-exame';
import { Exame } from './../../model/exame';
import { ExameBuilder } from './../exame/exame.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ResultadoExameBuilder extends GenericBuilder {

    initialize( resultadoExame: ResultadoExame ): ResultadoExame {
        resultadoExame = new ResultadoExame();

        resultadoExame.setEmpregadoConvocacao(new EmpregadoConvocacao());
        
        resultadoExame.setExame(new ExameBuilder().initialize(new Exame()));
        
        resultadoExame.setItemResultadoExames(new ItemResultadoExameBuilder().initializeList(new Array<ItemResultadoExame>()));
        
        return resultadoExame;
    }

    initializeList( resultadoExames: Array<ResultadoExame> ) {

        let array: Array<ResultadoExame> = new Array<ResultadoExame>();

        if ( resultadoExames === null || resultadoExames === undefined )
            resultadoExames = new Array<ResultadoExame>();

        for ( let resultadoExame of resultadoExames ) {
            array.push( this.initialize( resultadoExame ) );
        }

        return array;
    }

    clone( resultadoExame: ResultadoExame ): ResultadoExame {
        let cloneResultadoExame = new ResultadoExame();

        if ( resultadoExame === null || resultadoExame === undefined )
            resultadoExame = new ResultadoExame();

        cloneResultadoExame.setId( this.getValue( resultadoExame, "getId" ) );
        cloneResultadoExame.setVersion( this.getValue( resultadoExame, "getVersion" ) );
        cloneResultadoExame.setConforme(this.getValue( resultadoExame, "getConforme" ) );
        cloneResultadoExame.setParticular(this.getValue( resultadoExame, "getParticular" ) );
        cloneResultadoExame.setData(this.getValue( resultadoExame, "getData" ) );
        cloneResultadoExame.setDataRecebimento(this.getValue( resultadoExame, "getDataRecebimento" ) );
        cloneResultadoExame.setLocal(this.getValue( resultadoExame, "getLocal" ) );
        
        if(this.getValue(resultadoExame, "getTipo") == "")
            cloneResultadoExame.setTipo(undefined);
        else if (this.getValue(resultadoExame, "getTipo") == undefined)
            cloneResultadoExame.setTipo("");
        else
            cloneResultadoExame.setTipo(this.getValue(resultadoExame, "getTipo"));
        
        if(this.getValue(resultadoExame, "getAcao") == "")
            cloneResultadoExame.setAcao(undefined);
        else if (this.getValue(resultadoExame, "getAcao") == undefined)
            cloneResultadoExame.setAcao("");
        else
            cloneResultadoExame.setAcao(this.getValue(resultadoExame, "getAcao"));
        
        cloneResultadoExame.setEmpregadoConvocacao(new EmpregadoConvocacao());
        
        if ( this.getValue( resultadoExame, "getExame" ) !== undefined ) {
            cloneResultadoExame.setExame(
                new ExameBuilder().clone( this.getValue( resultadoExame, "getExame" ) ) );
            if ( !this.idGtZero( cloneResultadoExame.getExame() ) )
                cloneResultadoExame.setExame( undefined );
        } else {
            cloneResultadoExame.setExame( new ExameBuilder().initialize( null ) );
        }
        
        cloneResultadoExame.setItemResultadoExames(
                new ItemResultadoExameBuilder().cloneList(this.getValue( resultadoExame, "getItemResultadoExames" )));

        return cloneResultadoExame;
    }

    cloneList( resultadoExames: Array<ResultadoExame> ): Array<ResultadoExame> {
        let array: Array<ResultadoExame> = new Array<ResultadoExame>();

        if ( resultadoExames !== null && resultadoExames !== undefined ) {
            for ( let resultadoExame of resultadoExames ) {
                array.push( this.clone( resultadoExame ) );
            }
        }

        return array;
    }
}