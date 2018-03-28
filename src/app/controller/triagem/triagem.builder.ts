import { Triagem } from './../../model/triagem';
import { Atendimento } from './../../model/atendimento';
import { Equipe } from './../../model/equipe';
import { Acao } from './../../model/acao';
import { Intervencao } from './../../model/intervencao';
import { Diagnostico } from './../../model/diagnostico';
import { AtendimentoBuilder } from './../atendimento/atendimento.builder';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { IntervencaoBuilder } from './../intervencao/intervencao.builder';
import { DiagnosticoBuilder } from './../diagnostico/diagnostico.builder';
import { IndicadorSast } from './../../model/indicador-sast';
import { IndicadorSastBuilder } from './../indicador-sast/indicador-sast.builder';
import { RiscoEmpregado } from './../../model/risco-empregado';
import { RiscoEmpregadoBuilder } from './../risco-empregado/risco-empregado.builder';
import { AcaoBuilder } from './../acao/acao.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class TriagemBuilder extends GenericBuilder {
    
    initialize(triagem: Triagem) {
        triagem = new Triagem();
        
        triagem.setAtendimento(new Atendimento());
        triagem.setIndicadorSast(new IndicadorSastBuilder().initialize(new IndicadorSast()));
        triagem.setRiscoEmpregado(new RiscoEmpregadoBuilder().initialize(new RiscoEmpregado()));
        triagem.setDiagnostico(new DiagnosticoBuilder().initialize(new Diagnostico()));
        triagem.setIntervencao(new IntervencaoBuilder().initialize(new Intervencao()));
        triagem.setEquipeAbordagem(new EquipeBuilder().initialize(new Equipe()));
        triagem.setAcoes(new AcaoBuilder().initializeList(new Array<Acao>()));
        
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
        cloneTriagem.setJustificativa(this.getValue(triagem,"getJustificativa"))
        
        if(this.getValue(triagem, "getPrazo") == "")
            cloneTriagem.setPrazo(undefined);
        else if (this.getValue(triagem, "getPrazo") == undefined)
            cloneTriagem.setPrazo("");
        else
            cloneTriagem.setPrazo(this.getValue(triagem, "getPrazo"));
        
        cloneTriagem.setIndicadorSast(new IndicadorSastBuilder().clone(this.getValue( triagem, "getIndicadorSast" )));
        
        if (this.getValue(triagem, "getDiagnostico") !== undefined) { 
            cloneTriagem.setDiagnostico(new DiagnosticoBuilder().clone(this.getValue( triagem, "getDiagnostico" )));
            if(!this.idGtZero(cloneTriagem.getDiagnostico()))
                cloneTriagem.setDiagnostico(undefined);
        } else {
            cloneTriagem.setDiagnostico(new DiagnosticoBuilder().initialize(null));            
        }
        
        if (this.getValue(triagem, "getIntervencao") !== undefined) { 
            cloneTriagem.setIntervencao(new IntervencaoBuilder().clone(this.getValue( triagem, "getIntervencao" )));
            if(!this.idGtZero(cloneTriagem.getIntervencao()))
                cloneTriagem.setIntervencao(undefined);
        } else {
            cloneTriagem.setIntervencao(new IntervencaoBuilder().initialize(null));            
        }
        
        if (this.getValue(triagem, "getEquipeAbordagem") !== undefined) { 
            cloneTriagem.setEquipeAbordagem(new EquipeBuilder().clone(this.getValue( triagem, "getEquipeAbordagem" )));
            if(!this.idGtZero(cloneTriagem.getEquipeAbordagem()))
                cloneTriagem.setEquipeAbordagem(undefined);
        } else {
            cloneTriagem.setEquipeAbordagem(new EquipeBuilder().initialize(null));            
        }
        
        cloneTriagem.setAcoes(new AcaoBuilder().cloneList(this.getValue(triagem, "getAcoes")));
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