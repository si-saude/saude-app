import { Triagem } from './../../model/triagem';
import { Atendimento } from './../../model/atendimento';
import { AtendimentoBuilder } from './../atendimento/atendimento.builder';
import { IndicadorSast } from './../../model/indicador-sast';
import { IndicadorSastBuilder } from './../indicador-sast/indicador-sast.builder';
import { RiscoEmpregado } from './../../model/risco-empregado';
import { RiscoEmpregadoBuilder } from './../risco-empregado/risco-empregado.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class TriagemBuilder extends GenericBuilder {
    
    initialize(triagem: Triagem) {
        triagem = new Triagem();
        
        triagem.setAtendimento(new Atendimento());
        triagem.setIndicadorSast(new IndicadorSastBuilder().initialize(new IndicadorSast()));
        triagem.setRiscoEmpregado(new RiscoEmpregadoBuilder().initialize(new RiscoEmpregado()));
        
        return triagem;
    }
    
    initializeList(triagens: Array<Triagem>) {
        
        let array:Array<Triagem> = new Array<Triagem>();
        
        if(triagens === null || triagens === undefined)
            triagens = new Array<Triagem>();
        
        for (let triagem of triagens) {
            array.push(this.initialize(triagem));
        }
        
        return array;
    }
    
    clone(triagem: Triagem): Triagem {
        
        if (triagem === null || triagem === undefined)
            triagem = new Triagem();
        
        let cloneTriagem = new Triagem();
        cloneTriagem.setId(this.getValue(triagem,"getId"));
        cloneTriagem.setVersion(this.getValue(triagem,"getVersion"));
        cloneTriagem.setIndice(this.getValue(triagem,"getIndice"));
        
        cloneTriagem.setIndicadorSast(this.getValue(triagem,"getIndicadorSast"));
        cloneTriagem.setAtendimento(new AtendimentoBuilder().clone(this.getValue( triagem, "getAtendimento" ) ))
        cloneTriagem.setRiscoEmpregado(new RiscoEmpregadoBuilder().clone(this.getValue(triagem, "getRiscoEmpregado")));
        
        return cloneTriagem;
    }
    
    cloneList(triagens: Array<Triagem>): Array<Triagem> {
        let array:Array<Triagem> = new Array<Triagem>();
    
        if (triagens !== null && triagens !== undefined) {    
            for (let triagem of triagens) {
                array.push(this.clone(triagem));
            }
        }
        
        return array;
    }
    
}