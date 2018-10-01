import { Cat } from './../../model/cat';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { EmpresaBuilder } from './../empresa/empresa.builder';
import { GerenciaBuilder } from './../gerencia/gerencia.builder';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { ClassificacaoAfastamentoBuilder } from './../classificacao-afastamento/classificacao-afastamento.builder';
import { DiagnosticoBuilder } from './../diagnostico/diagnostico.builder';
import { FornecedorBuilder } from './../fornecedor/fornecedor.builder';
import { ParteCorpoAtingidaBuilder } from './../parte-corpo-atingida/parte-corpo-atingida.builder';
import { AgenteCausadorBuilder } from './../agente-causador/agente-causador.builder';
import { NaturezaLesaoBuilder } from './../natureza-lesao/natureza-lesao.builder';
import { BaseBuilder } from './../base/base.builder';
import { CidadeBuilder } from './../cidade/cidade.builder';
import { InstalacaoBuilder } from './../instalacao/instalacao.builder';
import { CnaeBuilder } from './../cnae/cnae.builder';
import { ClassificacaoGravidadeBuilder } from './../classificacao-gravidade/classificacao-gravidade.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class CatBuilder extends GenericBuilder {

    initialize(cat: Cat) {
        cat = new Cat();
        
        cat.setEmpregado(new EmpregadoBuilder().initialize(cat.getEmpregado()));
        cat.setEmpresa(new EmpresaBuilder().initialize(cat.getEmpresa()));
        cat.setGerencia(new GerenciaBuilder().initialize(cat.getGerencia()));
        cat.setProfissionalCaracterizacao(new ProfissionalSaudeBuilder().initialize(cat.getProfissionalCaracterizacao()));
        cat.setClassificacao(new ClassificacaoAfastamentoBuilder().initialize(cat.getClassificacao()));
        cat.setCid(new DiagnosticoBuilder().initialize(cat.getCid()));
        cat.setProfissionalClassificacao(new ProfissionalSaudeBuilder().initialize(cat.getProfissionalClassificacao()));
        cat.setAgenteCausador(new AgenteCausadorBuilder().initialize(cat.getAgenteCausador()));
        cat.setNaturezaLesao(new NaturezaLesaoBuilder().initialize(cat.getNaturezaLesao()));
        cat.setParteCorpoAtingida(new ParteCorpoAtingidaBuilder().initialize(cat.getParteCorpoAtingida()));
        cat.setMunicipio(new CidadeBuilder().initialize(cat.getMunicipio()));
        cat.setInstalacao(new InstalacaoBuilder().initialize(cat.getInstalacao()));
        cat.setCnae(new CnaeBuilder().initialize(cat.getCnae()));
        cat.setClassificacaoGravidade(new ClassificacaoGravidadeBuilder().initialize(cat.getClassificacaoGravidade()));
        cat.setDiagnosticoProvavel(new DiagnosticoBuilder().initialize(cat.getDiagnosticoProvavel()));
        
        return cat;
    }
    
    initializeList(cats: Array<Cat>) {
        
        let array:Array<Cat> = new Array<Cat>();
        
        if(cats === null || cats === undefined)
            cats = new Array<Cat>();
        
        for (let cat of cats) {
            array.push(this.initialize(cat));
        }
        
        return array;
    }
    
    clone(cat: Cat): Cat {
        
        if (cat === null || cat === undefined)
            cat = new Cat();
        
        let cloneCat = new Cat();
        cloneCat.setId(this.getValue(cat,"getId"));
        cloneCat.setGerenteContrato(this.getValue(cat,"getGerenteContrato"));
        cloneCat.setTelefoneGerente(this.getValue(cat,"getTelefoneGerente"));
        cloneCat.setFiscalContrato(this.getValue(cat,"getFiscalContrato"));
        cloneCat.setTelefoneFiscal(this.getValue(cat,"getTelefoneFiscal"));
        cloneCat.setDataOcorrencia(this.getValue(cat,"getDataOcorrencia"));
        cloneCat.setLocal(this.getValue(cat,"getLocal"));
        cloneCat.setDescricao(this.getValue(cat,"getDescricao"));
        cloneCat.setEmpregadoServicoCompanhia(this.getValue(cat,"getEmpregadoServicoCompanhia"));
        cloneCat.setOcorrenciaAmbienteTrabalho(this.getValue(cat,"getOcorrenciaAmbienteTrabalho"));
        cloneCat.setOcorrenciaTrajeto(this.getValue(cat,"getOcorrenciaTrajeto"));
        cloneCat.setResponsavelInformacao(this.getValue(cat,"getResponsavelInformacao"));
        cloneCat.setDataInformacao(this.getValue(cat,"getDataInformacao"));
        cloneCat.setCaracterizacao(this.getValue(cat,"getCaracterizacao"));
        cloneCat.setLesaoCorporal(this.getValue(cat,"getLesaoCorporal"));
        cloneCat.setNexoCausal(this.getValue(cat,"getNexoCausal"));
        cloneCat.setDataCaracterizacao(this.getValue(cat,"getDataCaracterizacao"));
        cloneCat.setTempoPrevisto(this.getValue(cat,"getTempoPrevisto"));
        cloneCat.setFerimentoGrave(this.getValue(cat,"getFerimentoGrave"));
        cloneCat.setDataClassificacao(this.getValue(cat,"getDataClassificacao"));
        cloneCat.setRemuneracao(this.treatMoney(this.getValue(cat,"getRemuneracao")));
        cloneCat.setDataObito(this.getValue(cat,"getDataObito"));
        cloneCat.setRta(this.getValue(cat,"getRta"));
        cloneCat.setGrauRiscoEmpresa(this.getValue(cat,"getGrauRiscoEmpresa"));
        cloneCat.setNumeroSisin(this.getValue(cat,"getNumeroSisin"));
        cloneCat.setClassificacaoSisin(this.getValue(cat,"getClassificacaoSisin"));
        cloneCat.setDataAvaliacaoMedica(this.getValue(cat,"getDataAvaliacaoMedica"));
        cloneCat.setRegistroSd2000(this.getValue(cat,"getRegistroSd2000"));
        cloneCat.setCatSd2000(this.getValue(cat,"getCatSd2000"));
        cloneCat.setDataEmissao(this.getValue(cat,"getDataEmissao"));
        cloneCat.setPendenciaCorrecao(this.getValue(cat,"getPendenciaCorrecao"));
        cloneCat.setJustificativaAtrasoEmissaoCat(this.getValue(cat,"getJustificativaAtrasoEmissaoCat"));
        cloneCat.setNumeroCartaMulta(this.getValue(cat,"getNumeroCartaMulta"));
        cloneCat.setTipoAcidente(this.getValue(cat,"getTipoAcidente"));
        cloneCat.setTipoCat(this.getValue(cat,"getTipoCat"));
        cloneCat.setComunicavelSus(this.getValue(cat,"getComunicavelSus"));
        cloneCat.setNumeroCat(this.getValue(cat,"getNumeroCat"));
        cloneCat.setCodigoCartaSindicato(this.getValue(cat,"getCodigoCartaSindicato"));
        cloneCat.setClassificacaoAnomalia(this.getValue(cat,"getClassificacaoAnomalia"));
        cloneCat.setDataComunicacaoSindicato(this.getValue(cat,"getDataComunicacaoSindicato"));
        cloneCat.setJustificativaAtrasoEmissaoCarta(this.getValue(cat,"getJustificativaAtrasoEmissaoCarta"));
        
        if (this.getValue(cat, "getDiagnosticoProvavel") !== undefined) { 
            cloneCat.setDiagnosticoProvavel(
                    new DiagnosticoBuilder().clone(this.getValue(cat,"getDiagnosticoProvavel")));
            if(!this.idGtZero(cloneCat.getDiagnosticoProvavel()))
                cloneCat.setDiagnosticoProvavel(undefined);
        } else {
            cloneCat.setDiagnosticoProvavel(new DiagnosticoBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getClassificacaoGravidade") !== undefined) { 
            cloneCat.setClassificacaoGravidade(
                    new ClassificacaoGravidadeBuilder().clone(this.getValue(cat,"getClassificacaoGravidade")));
            if(!this.idGtZero(cloneCat.getClassificacaoGravidade()))
                cloneCat.setClassificacaoGravidade(undefined);
        } else {
            cloneCat.setClassificacaoGravidade(new ClassificacaoGravidadeBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getCnae") !== undefined) { 
            cloneCat.setCnae(
                    new CnaeBuilder().clone(this.getValue(cat,"getCnae")));
            if(!this.idGtZero(cloneCat.getCnae()))
                cloneCat.setCnae(undefined);
        } else {
            cloneCat.setCnae(new CnaeBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getInstalacao") !== undefined) { 
            cloneCat.setInstalacao(
                    new InstalacaoBuilder().clone(this.getValue(cat,"getInstalacao")));
            if(!this.idGtZero(cloneCat.getInstalacao()))
                cloneCat.setInstalacao(undefined);
        } else {
            cloneCat.setInstalacao(new InstalacaoBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getAgenteCausador") !== undefined) { 
            cloneCat.setAgenteCausador(
                    new AgenteCausadorBuilder().clone(this.getValue(cat,"getAgenteCausador")));
            if(!this.idGtZero(cloneCat.getAgenteCausador()))
                cloneCat.setAgenteCausador(undefined);
        } else {
            cloneCat.setAgenteCausador(new AgenteCausadorBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getNaturezaLesao") !== undefined) { 
            cloneCat.setNaturezaLesao(
                    new NaturezaLesaoBuilder().clone(this.getValue(cat,"getNaturezaLesao")));
            if(!this.idGtZero(cloneCat.getNaturezaLesao()))
                cloneCat.setNaturezaLesao(undefined);
        } else {
            cloneCat.setNaturezaLesao(new NaturezaLesaoBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getParteCorpoAtingida") !== undefined) { 
            cloneCat.setParteCorpoAtingida(
                    new ParteCorpoAtingidaBuilder().clone(this.getValue(cat,"getParteCorpoAtingida")));
            if(!this.idGtZero(cloneCat.getParteCorpoAtingida()))
                cloneCat.setParteCorpoAtingida(undefined);
        } else {
            cloneCat.setParteCorpoAtingida(new ParteCorpoAtingidaBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getEmpregado") !== undefined) { 
            cloneCat.setEmpregado(
                    new EmpregadoBuilder().clone(this.getValue(cat,"getEmpregado")));
            if(!this.idGtZero(cloneCat.getEmpregado()))
                cloneCat.setEmpregado(undefined);
        } else {
            cloneCat.setEmpregado(new EmpregadoBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getEmpresa") !== undefined) { 
            cloneCat.setEmpresa(
                    new EmpresaBuilder().clone(this.getValue(cat,"getEmpresa")));
            if(!this.idGtZero(cloneCat.getEmpresa()))
                cloneCat.setEmpresa(undefined);
        } else {
            cloneCat.setEmpresa(new EmpresaBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getGerencia") !== undefined) { 
            cloneCat.setGerencia(
                    new GerenciaBuilder().clone(this.getValue(cat,"getGerencia")));
            if(!this.idGtZero(cloneCat.getGerencia()))
                cloneCat.setGerencia(undefined);
        } else {
            cloneCat.setGerencia(new GerenciaBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getProfissionalCaracterizacao") !== undefined) { 
            cloneCat.setProfissionalCaracterizacao(
                    new ProfissionalSaudeBuilder().clone(this.getValue(cat,"getProfissionalCaracterizacao")));
            if(!this.idGtZero(cloneCat.getProfissionalCaracterizacao()))
                cloneCat.setProfissionalCaracterizacao(undefined);
        } else {
            cloneCat.setProfissionalCaracterizacao(new ProfissionalSaudeBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getClassificacao") !== undefined) { 
            cloneCat.setClassificacao(
                    new ClassificacaoAfastamentoBuilder().clone(this.getValue(cat,"getClassificacao")));
            if(!this.idGtZero(cloneCat.getClassificacao()))
                cloneCat.setClassificacao(undefined);
        } else {
            cloneCat.setClassificacao(new ClassificacaoAfastamentoBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getCid") !== undefined) { 
            cloneCat.setCid(
                    new DiagnosticoBuilder().clone(this.getValue(cat,"getCid")));
            if(!this.idGtZero(cloneCat.getCid()))
                cloneCat.setCid(undefined);
        } else {
            cloneCat.setCid(new DiagnosticoBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getProfissionalClassificacao") !== undefined) { 
            cloneCat.setProfissionalClassificacao(
                    new ProfissionalSaudeBuilder().clone(this.getValue(cat,"getProfissionalClassificacao")));
            if(!this.idGtZero(cloneCat.getProfissionalClassificacao()))
                cloneCat.setProfissionalClassificacao(undefined);
        } else {
            cloneCat.setProfissionalClassificacao(new ProfissionalSaudeBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getMunicipio") !== undefined) { 
            cloneCat.setMunicipio(
                    new CidadeBuilder().clone(this.getValue(cat,"getMunicipio")));
            if(!this.idGtZero(cloneCat.getMunicipio()))
                cloneCat.setMunicipio(undefined);
        } else {
            cloneCat.setMunicipio(new CidadeBuilder().initialize(null));
        }

        return cloneCat;
    }
    
    cloneList(cats: Array<Cat>): Array<Cat> {
        let array:Array<Cat> = new Array<Cat>();
    
        if (cats !== null && cats !== undefined) { 
            for (let cat of cats) {
                array.push(this.clone(cat));
            }
        }
        
        return array;
    }
    
    treatMoney( value: string ) {
        if ( value != undefined ) {
            let realValue = value.toString().replace(/\.|\,||/gi, "");
            return Number(realValue.substring(0, realValue.length - 2)+"."+realValue.substring(realValue.length-2, realValue.length));
        }
    }
    
}