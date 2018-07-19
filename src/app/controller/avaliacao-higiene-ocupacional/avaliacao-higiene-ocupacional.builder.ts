import { AvaliacaoHigieneOcupacional } from '../../model/avaliacao-higiene-ocupacional';
import { GenericBuilder } from '../../generics/generic.builder';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { LocalizacaoBuilder } from './../localizacao/localizacao.builder';
import { Empregado } from './../../model/empregado';
import { Profissional } from './../../model/profissional';
import { Localizacao } from './../../model/localizacao';

export class AvaliacaoHigieneOcupacionalBuilder extends GenericBuilder {

    initialize(avaliacaoHigieneOcupacional: AvaliacaoHigieneOcupacional) {
        avaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacional();
        
        avaliacaoHigieneOcupacional.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        avaliacaoHigieneOcupacional.setLocal(new LocalizacaoBuilder().initialize(new Localizacao()));
        avaliacaoHigieneOcupacional.setTecnico(new ProfissionalSaudeBuilder().initialize(new Profissional()));
        
        return avaliacaoHigieneOcupacional;
    }
    
    clone(avaliacaoHigieneOcupacional: AvaliacaoHigieneOcupacional): AvaliacaoHigieneOcupacional {
        
        if (avaliacaoHigieneOcupacional === null || avaliacaoHigieneOcupacional === undefined)
            avaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacional();
        
        let cloneAvaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacional();
        cloneAvaliacaoHigieneOcupacional.setId(this.getValue(avaliacaoHigieneOcupacional,"getId"));
        cloneAvaliacaoHigieneOcupacional.setBrigada(this.getValue(avaliacaoHigieneOcupacional,"getBrigada"));
        cloneAvaliacaoHigieneOcupacional.setData(this.getValue(avaliacaoHigieneOcupacional,"getData"));
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
        
        cloneAvaliacaoHigieneOcupacional.setTecnico(new ProfissionalSaudeBuilder().clone(this.getValue(avaliacaoHigieneOcupacional,"getTecnico")));
        cloneAvaliacaoHigieneOcupacional.setEmpregado(new EmpregadoBuilder().clone(this.getValue(avaliacaoHigieneOcupacional,"getEmpregado")));
        
        if (this.getValue(avaliacaoHigieneOcupacional,"getLocal") !== undefined) { 
            cloneAvaliacaoHigieneOcupacional.setLocal(
                    new LocalizacaoBuilder().clone(this.getValue(avaliacaoHigieneOcupacional,"getLocal")));
            if(!this.idGtZero(cloneAvaliacaoHigieneOcupacional.getLocal()))
                cloneAvaliacaoHigieneOcupacional.setLocal(undefined);
        } else {
            cloneAvaliacaoHigieneOcupacional.setLocal(new LocalizacaoBuilder().initialize(null));
        }
        
        
        return cloneAvaliacaoHigieneOcupacional;
    }
    
}