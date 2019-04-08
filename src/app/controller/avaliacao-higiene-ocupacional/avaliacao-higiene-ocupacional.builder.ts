import { AvaliacaoHigieneOcupacional } from '../../model/avaliacao-higiene-ocupacional';
import { GenericBuilder } from '../../generics/generic.builder';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { GerenciaBuilder } from './../gerencia/gerencia.builder';
import { CargoBuilder } from './../cargo/cargo.builder';
import { QuestionarioVedacaoMascaraBuilder } from './../questionario-vedacao-mascara/questionario-vedacao-mascara.builder';
import { GheBuilder } from './../ghe/ghe.builder';
import { QuestionarioVedacaoMascara } from './../../model/questionario-vedacao-mascara';
import { Empregado } from './../../model/empregado';
import { Profissional } from './../../model/profissional';
import { Cargo } from './../../model/cargo';
import { Gerencia } from './../../model/gerencia';
import { Ghe } from './../../model/ghe';

export class AvaliacaoHigieneOcupacionalBuilder extends GenericBuilder {

    initialize(avaliacaoHigieneOcupacional: AvaliacaoHigieneOcupacional) {
        avaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacional();
        
        avaliacaoHigieneOcupacional.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        avaliacaoHigieneOcupacional.setProfissional(new ProfissionalSaudeBuilder().initialize(new Profissional()));
        avaliacaoHigieneOcupacional.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        avaliacaoHigieneOcupacional.setGhe(new GheBuilder().initialize(new Ghe()));
        avaliacaoHigieneOcupacional.setCargo(new CargoBuilder().initialize(new Cargo()));
        avaliacaoHigieneOcupacional.setQuestionarioVedacaoMascara(new QuestionarioVedacaoMascaraBuilder().initialize(new QuestionarioVedacaoMascara()));
        
        return avaliacaoHigieneOcupacional;
    }
    
    initializeList(avaliacaoHigieneOcupacionals: Array<AvaliacaoHigieneOcupacional>) {
        
        let array:Array<AvaliacaoHigieneOcupacional> = new Array<AvaliacaoHigieneOcupacional>();
        
        if(avaliacaoHigieneOcupacionals === null || avaliacaoHigieneOcupacionals === undefined)
            avaliacaoHigieneOcupacionals = new Array<AvaliacaoHigieneOcupacional>();
        
        for (let avaliacaoHigieneOcupacional of avaliacaoHigieneOcupacionals) {
            array.push(this.initialize(avaliacaoHigieneOcupacional));
        }
        
        return array;
    }
    
    clone(avaliacaoHigieneOcupacional: AvaliacaoHigieneOcupacional): AvaliacaoHigieneOcupacional {
        
        if (avaliacaoHigieneOcupacional === null || avaliacaoHigieneOcupacional === undefined)
            avaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacional();
        
        let cloneAvaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacional();
        cloneAvaliacaoHigieneOcupacional.setId(this.getValue(avaliacaoHigieneOcupacional,"getId"));
        cloneAvaliacaoHigieneOcupacional.setBrigada(this.getValue(avaliacaoHigieneOcupacional,"getBrigada"));
        cloneAvaliacaoHigieneOcupacional.setEspacoConfinado(this.getValue(avaliacaoHigieneOcupacional,"getEspacoConfinado"));
        cloneAvaliacaoHigieneOcupacional.setFim(this.getValue(avaliacaoHigieneOcupacional,"getFim"));
        cloneAvaliacaoHigieneOcupacional.setInicio(this.getValue(avaliacaoHigieneOcupacional,"getInicio"));
        cloneAvaliacaoHigieneOcupacional.setNaoBarbeado(this.getValue(avaliacaoHigieneOcupacional,"getNaoBarbeado"));
        cloneAvaliacaoHigieneOcupacional.setNaoUtilizaMascara(this.getValue(avaliacaoHigieneOcupacional,"getNaoUtilizaMascara"));
        cloneAvaliacaoHigieneOcupacional.setObservacao(this.getValue(avaliacaoHigieneOcupacional,"getObservacao"));
        cloneAvaliacaoHigieneOcupacional.setTesteSensibilidadeInsatisfatorio(this.getValue(avaliacaoHigieneOcupacional,"getTesteSensibilidadeInsatisfatorio"));
        cloneAvaliacaoHigieneOcupacional.setUsoVoluntario(this.getValue(avaliacaoHigieneOcupacional,"getUsoVoluntario"));
        cloneAvaliacaoHigieneOcupacional.setEnsaioVedacao(this.getValue(avaliacaoHigieneOcupacional,"getEnsaioVedacao"));
        cloneAvaliacaoHigieneOcupacional.setVersion(this.getValue(avaliacaoHigieneOcupacional, "getVersion"));
        
        cloneAvaliacaoHigieneOcupacional.setConcordaDescricaoAprhoGhe(this.getValue(avaliacaoHigieneOcupacional,"getConcordaDescricaoAprhoGhe"));
        cloneAvaliacaoHigieneOcupacional.setNaoConcordaAgentesRiscos(this.getValue(avaliacaoHigieneOcupacional,"getNaoConcordaAgentesRiscos"));
        cloneAvaliacaoHigieneOcupacional.setNaoConcordaAtividades(this.getValue(avaliacaoHigieneOcupacional,"getNaoConcordaAtividades"));
        cloneAvaliacaoHigieneOcupacional.setNaoConcordaFrequenciaExposicaoRiscos(this.getValue(avaliacaoHigieneOcupacional,"getNaoConcordaFrequenciaExposicaoRiscos"));
        cloneAvaliacaoHigieneOcupacional.setNaoConcordaCategoriaRiscos(this.getValue(avaliacaoHigieneOcupacional,"getNaoConcordaCategoriaRiscos"));
        cloneAvaliacaoHigieneOcupacional.setMotivoAnalisePreliminar(this.getValue(avaliacaoHigieneOcupacional,"getMotivoAnalisePreliminar"));       
        
        
        cloneAvaliacaoHigieneOcupacional.setFiscalSopSg(this.getValue(avaliacaoHigieneOcupacional,"getFiscalSopSg"));
        cloneAvaliacaoHigieneOcupacional.setOpEcolEcomp(this.getValue(avaliacaoHigieneOcupacional,"getOpEcolEcomp"));
        cloneAvaliacaoHigieneOcupacional.setOutros(this.getValue(avaliacaoHigieneOcupacional,"getOutros"));
        cloneAvaliacaoHigieneOcupacional.setEnsaioVedacaoRealizado(this.getValue(avaliacaoHigieneOcupacional,"getEnsaioVedacaoRealizado"));
        cloneAvaliacaoHigieneOcupacional.setHOconcordaDescricaoAprhoGhe(this.getValue(avaliacaoHigieneOcupacional,"getHOconcordaDescricaoAprhoGhe"));
        cloneAvaliacaoHigieneOcupacional.setObservacaoGHE(this.getValue(avaliacaoHigieneOcupacional,"getObservacaoGHE"));
        cloneAvaliacaoHigieneOcupacional.setJustificativaHO(this.getValue(avaliacaoHigieneOcupacional,"getJustificativaHO"));
        
        cloneAvaliacaoHigieneOcupacional.setGhe(new GheBuilder().clone(this.getValue(avaliacaoHigieneOcupacional,"getGhe")));
        cloneAvaliacaoHigieneOcupacional.setGerencia(new GerenciaBuilder().clone(this.getValue(avaliacaoHigieneOcupacional,"getGerencia")));
        cloneAvaliacaoHigieneOcupacional.setCargo(new CargoBuilder().clone(this.getValue(avaliacaoHigieneOcupacional,"getCargo")));
        cloneAvaliacaoHigieneOcupacional.setProfissional(new ProfissionalSaudeBuilder().clone(this.getValue(avaliacaoHigieneOcupacional,"getProfissional")));
        cloneAvaliacaoHigieneOcupacional.setEmpregado(new EmpregadoBuilder().clone(this.getValue(avaliacaoHigieneOcupacional,"getEmpregado")));
        cloneAvaliacaoHigieneOcupacional.setQuestionarioVedacaoMascara(new QuestionarioVedacaoMascaraBuilder().clone(this.getValue(avaliacaoHigieneOcupacional,"getQuestionarioVedacaoMascara")));
                
        return cloneAvaliacaoHigieneOcupacional;
    }
    
    cloneList(avaliacaoHigieneOcupacionals: Array<AvaliacaoHigieneOcupacional>): Array<AvaliacaoHigieneOcupacional> {
        let array:Array<AvaliacaoHigieneOcupacional> = new Array<AvaliacaoHigieneOcupacional>();
    
        if (avaliacaoHigieneOcupacionals !== null && avaliacaoHigieneOcupacionals !== undefined) { 
            for (let avaliacaoHigieneOcupacional of avaliacaoHigieneOcupacionals) {
                array.push(this.clone(avaliacaoHigieneOcupacional));
            }
        }
        
        return array;
    }
    
}