import { Empregado } from './empregado';
import { Empresa } from './empresa';
import { Gerencia } from './gerencia';
import { Profissional } from './profissional';
import { ClassificacaoAfastamento } from './classificacao-afastamento';
import { Diagnostico } from './diagnostico';
import { AgenteCausador } from './agente-causador';
import { ParteCorpoAtingida } from './parte-corpo-atingida';
import { NaturezaLesao } from './natureza-lesao';
import { Cidade } from './cidade';
import { Instalacao } from './instalacao';
import { Cnae } from './cnae';
import { ClassificacaoGravidade } from './classificacao-gravidade';
import { Exame } from './exame';
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
    
    private remuneracao: number;
    private agenteCausador: AgenteCausador;
    private parteCorpoAtingida: ParteCorpoAtingida;
    private naturezaLesao: NaturezaLesao;
    private dataObito: Date;
    
    private dataObitoCustomDate: CustomDate = new CustomDate(this.dataObito);

    private municipio: Cidade;
    private rta: string;
    private instalacao: Instalacao;
    private cnae: Cnae;
    private grauRiscoEmpresa: number;
    private numeroSisin: string;
    private classificacaoSisin: number;
    private classificacaoGravidade: ClassificacaoGravidade;
    private dataAvaliacaoMedica: Date;
    private registroSd2000: boolean;
    private catSd2000: boolean;
    private dataEmissao: Date;

    private dataAvaliacaoMedicaCustomDate: CustomDate = new CustomDate(this.dataAvaliacaoMedica);
    private dataEmissaoCustomDate: CustomDate = new CustomDate(this.dataEmissao);
    
    private pendenciaCorrecao: boolean;
    private justificativaAtrasoEmissaoCat: string;
    private numeroCartaMulta: string;
    private tipoAcidente: string;
    private tipoCat: string;
    private diagnosticoProvavel: Diagnostico;
    private comunicavelSus: boolean;
    private numeroCat: string;
    private codigoCartaSindicato: string;
    private classificacaoAnomalia: number;
    private dataComunicacaoSindicato: Date;
    private justificativaAtrasoEmissaoCarta: string;
    
    private dataComunicacaoSindicatoCustomDate: CustomDate = new CustomDate(this.dataComunicacaoSindicato);

    private catInss: boolean;
    private convocado: boolean;
    private examesConvocacao: Array<Exame>;
    private ausenciaExames: boolean;
    private recomendacoes: string;

    private arquivo: any;
    private arquivoBase64: string;
    private jornadaTrabalho: number;
    private ato1: string;
    private ato2: string;
    private ato3: string;
    private ato4: string;
    private ato5: string;
    private justificativa: string;
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
        return this.dataOcorrenciaCustomDate;
    }
    
    setDataOcorrenciaCustomDate(dataOcorrenciaCustomDate: CustomDate){
        this.dataOcorrenciaCustomDate = dataOcorrenciaCustomDate;
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
        return this.dataInformacaoCustomDate;
    }
    
    setDataInformacaoCustomDate(dataInformacaoCustomDate: CustomDate){
        this.dataInformacaoCustomDate = dataInformacaoCustomDate;
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
        return this.dataCaracterizacaoCustomDate;
    }
    
    setDataCaracterizacaoCustomDate(dataCaracterizacaoCustomDate: CustomDate){
        this.dataCaracterizacaoCustomDate = dataCaracterizacaoCustomDate;
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
        return this.dataClassificacaoCustomDate;
    }
    
    setDataClassificacaoCustomDate(dataClassificacaoCustomDate: CustomDate){
        this.dataClassificacaoCustomDate = dataClassificacaoCustomDate;
    }
    
    getRemuneracao() {
        return this.remuneracao;
    }

    setRemuneracao(remuneracao) {
        this.remuneracao = remuneracao;
    }

    getAgenteCausador() {
        return this.agenteCausador;
    }

    setAgenteCausador(agenteCausador) {
        this.agenteCausador = agenteCausador;
    }

    getParteCorpoAtingida() {
        return this.parteCorpoAtingida;
    }

    setParteCorpoAtingida(parteCorpoAtingida) {
        this.parteCorpoAtingida = parteCorpoAtingida;
    }

    getNaturezaLesao() {
        return this.naturezaLesao;
    }

    setNaturezaLesao(naturezaLesao) {
        this.naturezaLesao = naturezaLesao;
    }

    getDataObito() {
        this.dataObito = this.dataObitoCustomDate.getApiDate();
        return this.dataObito;
    }

    setDataObito(dataObito) {
        this.dataObitoCustomDate.setApiDate(dataObito);
        this.dataObito = dataObito;
    }
    
    getDataObitoCustomDate(){
        return this.dataObitoCustomDate;
    }
    
    setDataObitoCustomDate(dataObitoCustomDate: CustomDate){
        this.dataObitoCustomDate = dataObitoCustomDate;
    }
    
    getMunicipio() {
        return this.municipio;
    }

    setMunicipio(municipio) {
        this.municipio = municipio;
    }
    
    getVersion() {
        return this.version;
    }

    setVersion(version) {
        this.version = version;
    }
    
    getRta() {
        return this.rta;
    }

    setRta(rta) {
        this.rta = rta;
    }

    getInstalacao() {
        return this.instalacao;
    }

    setInstalacao(instalacao) {
        this.instalacao = instalacao;
    }
    
    getCnae() {
        return this.cnae;
    }

    setCnae(cnae) {
        this.cnae = cnae;
    }

    getGrauRiscoEmpresa() {
        return this.grauRiscoEmpresa;
    }

    setGrauRiscoEmpresa(grauRiscoEmpresa) {
        this.grauRiscoEmpresa = grauRiscoEmpresa;
    }

    getNumeroSisin() {
        return this.numeroSisin;
    }

    setNumeroSisin(numeroSisin) {
        this.numeroSisin = numeroSisin;
    }

    getClassificacaoSisin() {
        return this.classificacaoSisin;
    }

    setClassificacaoSisin(classificacaoSisin) {
        this.classificacaoSisin = classificacaoSisin;
    }

    getClassificacaoGravidade() {
        return this.classificacaoGravidade;
    }

    setClassificacaoGravidade(classificacaoGravidade) {
        this.classificacaoGravidade = classificacaoGravidade;
    }

    getDataAvaliacaoMedica() {
        this.dataAvaliacaoMedica = this.dataAvaliacaoMedicaCustomDate.getApiDate();
        return this.dataAvaliacaoMedica;
    }

    setDataAvaliacaoMedica(dataAvaliacaoMedica) {
        this.dataAvaliacaoMedicaCustomDate.setApiDate(dataAvaliacaoMedica);
        this.dataAvaliacaoMedica = dataAvaliacaoMedica;
    }
    
    getDataAvaliacaoMedicaCustomDate(){
        return this.dataAvaliacaoMedicaCustomDate;
    }
    
    setDataAvaliacaoMedicaCustomDate(dataAvaliacaoMedicaCustomDate: CustomDate){
        this.dataAvaliacaoMedicaCustomDate = dataAvaliacaoMedicaCustomDate;
    }

    getRegistroSd2000() {
        return this.registroSd2000;
    }

    setRegistroSd2000(registroSd2000) {
        this.registroSd2000 = registroSd2000;
    }

    getCatSd2000() {
        return this.catSd2000;
    }

    setCatSd2000(catSd2000) {
        this.catSd2000 = catSd2000;
    }

    getDataEmissao() {
        this.dataEmissao = this.dataEmissaoCustomDate.getApiDate();
        return this.dataEmissao;
    }

    setDataEmissao(dataEmissao) {
        this.dataEmissaoCustomDate.setApiDate(dataEmissao);
        this.dataEmissao = dataEmissao;
    }
    
    getDataEmissaoCustomDate(){
        return this.dataEmissaoCustomDate;
    }
    
    setDataEmissaoCustomDate(dataEmissaoCustomDate: CustomDate){
        this.dataEmissaoCustomDate = dataEmissaoCustomDate;
    }
    
    getPendenciaCorrecao() {
        return this.pendenciaCorrecao;
    }

    setPendenciaCorrecao(pendenciaCorrecao) {
        this.pendenciaCorrecao = pendenciaCorrecao;
    }

    getJustificativaAtrasoEmissaoCat() {
        return this.justificativaAtrasoEmissaoCat;
    }

    setJustificativaAtrasoEmissaoCat(justificativaAtrasoEmissaoCat) {
        this.justificativaAtrasoEmissaoCat = justificativaAtrasoEmissaoCat;
    }

    getNumeroCartaMulta() {
        return this.numeroCartaMulta;
    }

    setNumeroCartaMulta(numeroCartaMulta) {
        this.numeroCartaMulta = numeroCartaMulta;
    }

    getTipoAcidente() {
        return this.tipoAcidente;
    }

    setTipoAcidente(tipoAcidente) {
        this.tipoAcidente = tipoAcidente;
    }

    getTipoCat() {
        return this.tipoCat;
    }

    setTipoCat(tipoCat) {
        this.tipoCat = tipoCat;
    }

    getDiagnosticoProvavel() {
        return this.diagnosticoProvavel;
    }

    setDiagnosticoProvavel(diagnosticoProvavel) {
        this.diagnosticoProvavel = diagnosticoProvavel;
    }

    getComunicavelSus() {
        return this.comunicavelSus;
    }

    setComunicavelSus(comunicavelSus) {
        this.comunicavelSus = comunicavelSus;
    }

    getNumeroCat() {
        return this.numeroCat;
    }

    setNumeroCat(numeroCat) {
        this.numeroCat = numeroCat;
    }

    getCodigoCartaSindicato() {
        return this.codigoCartaSindicato;
    }

    setCodigoCartaSindicato(codigoCartaSindicato) {
        this.codigoCartaSindicato = codigoCartaSindicato;
    }

    getClassificacaoAnomalia() {
        return this.classificacaoAnomalia;
    }

    setClassificacaoAnomalia(classificacaoAnomalia) {
        this.classificacaoAnomalia = classificacaoAnomalia;
    }

    getDataComunicacaoSindicato() {
        this.dataComunicacaoSindicato = this.dataComunicacaoSindicatoCustomDate.getApiDate();
        return this.dataComunicacaoSindicato;
    }

    setDataComunicacaoSindicato(dataComunicacaoSindicato) {
        this.dataComunicacaoSindicatoCustomDate.setApiDate(dataComunicacaoSindicato);
        this.dataComunicacaoSindicato = dataComunicacaoSindicato;
    }
    
    getDataComunicacaoSindicatoCustomDate(){
        return this.dataComunicacaoSindicatoCustomDate;
    }
    
    setDataComunicacaoSindicatoCustomDate(dataComunicacaoSindicatoCustomDate: CustomDate){
        this.dataComunicacaoSindicatoCustomDate = dataComunicacaoSindicatoCustomDate;
    }

    getJustificativaAtrasoEmissaoCarta() {
        return this.justificativaAtrasoEmissaoCarta;
    }

    setJustificativaAtrasoEmissaoCarta(justificativaAtrasoEmissaoCarta) {
        this.justificativaAtrasoEmissaoCarta = justificativaAtrasoEmissaoCarta;
    }
    
    getCatInss() {
        return this.catInss;
    }

    setCatInss(catInss) {
        this.catInss = catInss;
    }

    getConvocado() {
        return this.convocado;
    }

    setConvocado(convocado) {
        this.convocado = convocado;
    }

    getExamesConvocacao() {
        return this.examesConvocacao;
    }

    setExamesConvocacao(examesConvocacao) {
        this.examesConvocacao = examesConvocacao;
    }

    getAusenciaExames() {
        return this.ausenciaExames;
    }

    setAusenciaExames(ausenciaExames) {
        this.ausenciaExames = ausenciaExames;
    }
    
    getRecomendacoes() {
        return this.recomendacoes;
    }

    setRecomendacoes(recomendacoes) {
        this.recomendacoes = recomendacoes;
    }
    
    getArquivo():any{
        return this.arquivo;
    }
    
    setArquivo(arquivo:any){
        this.arquivo = arquivo;
    }
    
    getArquivoBase64():string{
        return this.arquivoBase64;
    }
    
    setArquivoBase64(a:string){
        this.arquivoBase64 = a;
    }
    
    getJornadaTrabalho():number{
        return this.jornadaTrabalho;
    }
    
    setJornadaTrabalho(j:number){
        this.jornadaTrabalho = j;
    }
    
    getAto1():string{
        return this.ato1;
    }
    
    setAto1(a:string){
        this.ato1 = a;
    }

    getAto2():string{
        return this.ato2;
    }
    
    setAto2(a:string){
        this.ato2 = a;
    }
    
    getAto3():string{
        return this.ato3;
    }
    
    setAto3(a:string){
        this.ato3 = a;
    }
    
    getAto4():string{
        return this.ato4;
    }
    
    setAto4(a:string){
        this.ato4 = a;
    }
    
    getAto5():string{
        return this.ato5;
    }
    
    setAto5(a:string){
        this.ato5 = a;
    }
    
    getJustificativa():string{
        return this.justificativa;
    }
    
    setJustificativa(j:string){
        this.justificativa = j;
    }
}