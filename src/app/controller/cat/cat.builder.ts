import { Cat } from './../../model/cat';
import { GenericBuilder } from './../../generics/generic.builder';
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
        cloneCat.setVersion(this.getValue(cat,"getVersion"));
        
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
    
}