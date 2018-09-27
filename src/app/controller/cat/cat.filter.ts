import { EmpregadoFilter } from './../empregado/empregado.filter';
import { EmpresaFilter } from './../empresa/empresa.filter';
import { GerenciaFilter } from './../gerencia/gerencia.filter';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';
import { ClassificacaoAfastamentoFilter } from './../classificacao-afastamento/classificacao-afastamento.filter';
import { DiagnosticoFilter } from './../diagnostico/diagnostico.filter';

import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class CatFilter extends GenericFilter {
    private empregado: EmpregadoFilter = new EmpregadoFilter();
    private empresa: EmpresaFilter;
    private gerencia: GerenciaFilter;
    private telefoneGerente: string;
    private fiscalContrato:  string;
    private telefoneFiscal: string;
    private dataOcorrencia: DateFilter;
    private local: string;
    private descricao: string;
    private empregadoServicoCompanhia: BooleanFilter;
    private ocorrenciaAmbienteTrabalho: BooleanFilter;
    private ocorrenciaTrajeto: BooleanFilter;
    private responsavelInformacao: string;
    private dataInformacao: DateFilter;
    private caracterizacao: string;
    private lesaoCorporal: BooleanFilter;
    private nexoCausal: string;
    private profissionalCaracterizacao: ProfissionalSaudeFilter;
    private dataCaracterizacao: DateFilter;
    private classificacao: ClassificacaoAfastamentoFilter;
    private tempoPrevisto: number;
    private cid: DiagnosticoFilter ;
    private ferimentoGrave: BooleanFilter;
    private profissionalClassificacao: ProfissionalSaudeFilter;
    private dataClassificacao: DateFilter;

    getEmpregado() {
        return this.empregado;
    }
    setEmpregado(empregado) {
        this.empregado = empregado;
    }
    getEmpresa() {
        return this.empresa;
    }
    setEmpresa(empresa) {
        this.empresa = empresa;
    }
    getGerencia() {
        return this.gerencia;
    }
    setGerencia(gerencia) {
        this.gerencia = gerencia;
    }
    getTelefoneGerente() {
        return this.telefoneGerente;
    }
    setTelefoneGerente(telefoneGerente) {
        this.telefoneGerente = telefoneGerente;
    }
    getFiscalContrato() {
        return this.fiscalContrato;
    }
    setFiscalContrato(fiscalContrato) {
        this.fiscalContrato = fiscalContrato;
    }
    getTelefoneFiscal() {
        return this.telefoneFiscal;
    }
    setTelefoneFiscal(telefoneFiscal) {
        this.telefoneFiscal = telefoneFiscal;
    }
    getDataOcorrencia() {
        return this.dataOcorrencia;
    }
    setDataOcorrencia(dataOcorrencia) {
        this.dataOcorrencia = dataOcorrencia;
    }
    getLocal() {
        return this.local;
    }
    setLocal(local) {
        this.local = local;
    }
    getDescricao() {
        return this.descricao;
    }
    setDescricao(descricao) {
        this.descricao = descricao;
    }
    getEmpregadoServicoCompanhia() {
        return this.empregadoServicoCompanhia;
    }
    setEmpregadoServicoCompanhia(empregadoServicoCompanhia) {
        this.empregadoServicoCompanhia = empregadoServicoCompanhia;
    }
    getOcorrenciaAmbienteTrabalho() {
        return this.ocorrenciaAmbienteTrabalho;
    }
    setOcorrenciaAmbienteTrabalho(ocorrenciaAmbienteTrabalho) {
        this.ocorrenciaAmbienteTrabalho = ocorrenciaAmbienteTrabalho;
    }
    getOcorrenciaTrajeto() {
        return this.ocorrenciaTrajeto;
    }
    setOcorrenciaTrajeto(ocorrenciaTrajeto) {
        this.ocorrenciaTrajeto = ocorrenciaTrajeto;
    }
    getResponsavelInformacao() {
        return this.responsavelInformacao;
    }
    setResponsavelInformacao(responsavelInformacao) {
        this.responsavelInformacao = responsavelInformacao;
    }
    getDataInformacao() {
        return this.dataInformacao;
    }
    setDataInformacao(dataInformacao) {
        this.dataInformacao = dataInformacao;
    }
    getCaracterizacao() {
        return this.caracterizacao;
    }
    setCaracterizacao(caracterizacao) {
        this.caracterizacao = caracterizacao;
    }
    getLesaoCorporal() {
        return this.lesaoCorporal;
    }
    setLesaoCorporal(lesaoCorporal) {
        this.lesaoCorporal = lesaoCorporal;
    }
    getNexoCausal() {
        return this.nexoCausal;
    }
    setNexoCausal(nexoCausal) {
        this.nexoCausal = nexoCausal;
    }
    getProfissionalCaracterizacao() {
        return this.profissionalCaracterizacao;
    }
    setProfissionalCaracterizacao(profissionalCaracterizacao) {
        this.profissionalCaracterizacao = profissionalCaracterizacao;
    }
    getDataCaracterizacao() {
        return this.dataCaracterizacao;
    }
    setDataCaracterizacao(dataCaracterizacao) {
        this.dataCaracterizacao = dataCaracterizacao;
    }
    getClassificacao() {
        return this.classificacao;
    }
    setClassificacao(classificacao) {
        this.classificacao = classificacao;
    }
    getTempoPrevisto() {
        return this.tempoPrevisto;
    }
    setTempoPrevisto(tempoPrevisto) {
        this.tempoPrevisto = tempoPrevisto;
    }
    getCid() {
        return this.cid;
    }
    setCid(cid) {
        this.cid = cid;
    }
    getFerimentoGrave() {
        return this.ferimentoGrave;
    }
    setFerimentoGrave(ferimentoGrave) {
        this.ferimentoGrave = ferimentoGrave;
    }
    getProfissionalClassificacao() {
        return this.profissionalClassificacao;
    }
    setProfissionalClassificacao(profissionalClassificacao) {
        this.profissionalClassificacao = profissionalClassificacao;
    }
    getDataClassificacao() {
        return this.dataClassificacao;
    }
    setDataClassificacao(dataClassificacao) {
        this.dataClassificacao = dataClassificacao;
    }
    
}