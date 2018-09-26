import { Empregado } from './empregado';
import { Empresa } from './empresa';
import { Gerencia } from './gerencia';
import { Profissional } from './profissional';
import { ClassificacaoAfastamento } from './classificacao-afastamento';
import { Diagnostico } from './diagnostico';
import { CustomDate } from './../generics/utils/custom-date.util';

export class Cat {
    private id: number;
    private empregado: Empregado;
    private empresa: Empresa;
    private gerencia: Gerencia;
    private gerenteContrato: string;
    private telefoneGerente: string;
    private fiscalContrato: string;
    private telefoneFiscal: string;
    private dataOcorrencia: Date;
    private local: string;
    private descricao: string;
    private empregadoServicoCompanhia: boolean;
    private ocorrenciaAmbienteTrabalho: boolean;
    private ocorrenciaTrajeto: boolean;
    private responsavelInformacao: string;
    private dataInformacao: Date;
    private caracterizacao: string;
    private lesaoCorporal: boolean;
    private nexoCausal: string;
    private profissionalCaracterizacao: Profissional;
    private dataCaracterizacao: Date;
    private classificacao: ClassificacaoAfastamento;
    private tempoPrevisto: number;
    private cid: Diagnostico;
    private ferimentoGrave: boolean;
    private profissionalClassificacao: Profissional;
    private dataClassificacao: Date;

    private dataOcorrenciaCustomDate: CustomDate = new CustomDate(this.dataOcorrencia);
    private dataInformacaoCustomDate: CustomDate = new CustomDate(this.dataInformacao);
    private dataCaracterizacaoCustomDate: CustomDate = new CustomDate(this.dataCaracterizacao);
    private dataClassificacaoCustomDate: CustomDate = new CustomDate(this.dataClassificacao);

    private version: number;

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

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

    getGerenteContrato() {
        return this.gerenteContrato;
    }

    setGerenteContrato(gerenteContrato) {
        this.gerenteContrato = gerenteContrato;
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
        this.dataOcorrencia = this.dataOcorrenciaCustomDate.getApiDate();
        return this.dataOcorrencia ;
    }

    setDataOcorrencia(dataOcorrencia) {
        this.dataOcorrenciaCustomDate.setApiDate(dataOcorrencia);
        this.dataOcorrencia = dataOcorrencia;
    }
    
    getDataOcorrenciaCustomDate(){
        return this.dataOcorrencia;
    }
    
    setDataOcorrenciaCustomDate(dataOcorrencia: Date){
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
        this.dataInformacao = this.dataInformacaoCustomDate.getApiDate();
        return this.dataInformacao;
    }

    setDataInformacao(dataInformacao) {
        this.dataInformacaoCustomDate.setApiDate(dataInformacao);
        this.dataInformacao = dataInformacao;
    }
    
    getDataInformacaoCustomDate(){
        return this.dataInformacao;
    }
    
    setDataInformacaoCustomDate(dataInformacao: Date){
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
        this.dataCaracterizacao = this.dataCaracterizacaoCustomDate.getApiDate();
        return this.dataCaracterizacao;
    }

    setDataCaracterizacao(dataCaracterizacao) {
        this.dataCaracterizacaoCustomDate.setApiDate(dataCaracterizacao);
        this.dataCaracterizacao = dataCaracterizacao;
    }
    
    getDataCaracterizacaoCustomDate(){
        return this.dataCaracterizacao;
    }
    
    setDataCaracterizacaoCustomDate(dataCaracterizacao: Date){
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
        this.dataClassificacao = this.dataClassificacaoCustomDate.getApiDate();
        return this.dataClassificacao;
    }

    setDataClassificacao(dataClassificacao) {
        this.dataClassificacaoCustomDate.setApiDate(dataClassificacao);
        this.dataClassificacao = dataClassificacao;
    }
    
    getDataClassificacaoCustomDate(){
        return this.dataClassificacao;
    }
    
    setDataClassificacaoCustomDate(dataClassificacao: Date){
        this.dataClassificacao = dataClassificacao;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version) {
        this.version = version;
    }
    
}