import { Profissional } from './profissional';
import { Tarefa } from './tarefa';
import { Regime } from './regime';
import { Empregado } from './empregado';
import { Diagnostico } from './diagnostico';
import { MotivoRecusaAtestado } from './motivo-recusa-atestado';
import { Exame } from './exame';
import { CustomDate } from './../generics/utils/custom-date.util';
import { HistoricoAtestado } from './historico-atestado';

export class Atestado {
    private id: number;
    private numeroDias: number;
    private anexo: any;
    private anexoBase64: any;
    private tarefa: Tarefa;
    private impossibilidadeLocomocao: boolean;
    private status: string;
    private lancadoSap: boolean;
    private atestadoFisicoRecebido: boolean;
    private controleLicenca: boolean;
    private dataSolicitacao: Date;
    private inicio: Date;
    private contatoMedico: string;
    private clinica: string;
    private localAtendimento: string;
    private telefoneExterno: string;
    private emailExterno: string;
    
    private aposentadoInss: boolean;
    private presencial: boolean;
    private regime: Regime;
    private dataInicioEscalaTrabalho: Date;
    private dataFimEscalaTrabalho: Date;
    private possuiFeriasAgendadas: boolean;
    private dataInicioFerias: Date;
    private dataFimFerias: Date;
    private ciente: boolean;
    private empregado: Empregado;
    private motivoRecusa: MotivoRecusaAtestado;

    private dataInicioEscalaTrabalhoCustomDate: CustomDate = new CustomDate(this.dataInicioEscalaTrabalho);
    private dataFimEscalaTrabalhoCustomDate: CustomDate = new CustomDate(this.dataFimEscalaTrabalho);
    private dataInicioFeriasCustomDate: CustomDate = new CustomDate(this.dataInicioFerias);
    private dataFimFeriasCustomDate: CustomDate = new CustomDate(this.dataFimFerias);

    private inicioCustomDate: CustomDate = new CustomDate(this.inicio);
    private dataSolicitacaoCustomDate: CustomDate = new CustomDate(this.dataSolicitacao);

    private anexoRelatorioMedico: any;
    private anexoRelatorioMedicoBase64: any;
    private limiteAuditar: number;
    private limiteHomologar: number;
    private limiteLancar: number;

    private dataLimiteAuditar: Date;
    private dataLimiteAgendamento: Date;
    private dataLimiteLancar: Date;
    private dataLimiteHomologar: Date;
    private cid: Diagnostico;

    private dataLimiteAuditarCustomDate: CustomDate = new CustomDate(this.dataLimiteAuditar);
    private dataLimiteAgendamentoCustomDate: CustomDate = new CustomDate(this.dataLimiteAgendamento);
    private dataLimiteLancarCustomDate: CustomDate = new CustomDate(this.dataLimiteLancar);
    private dataLimiteHomologarCustomDate: CustomDate = new CustomDate(this.dataLimiteHomologar);
    private agendamento: Tarefa;
    private lancamentoSd2000: boolean;

    private somaDiasAtestados: number;
    private concatenacaoDatasCids: number;
    private observacao: string;
    private fim: Date;
    private examesConvocacao: Array<Exame>;
    private ausenciaExames: boolean;
    private historicoAtestados: Array<HistoricoAtestado>;
    private profissional: Profissional;
    private previewStatus: string;
    private dataAuditoria: Date;
    private convocado: boolean;
    private dataHomologacao: Date;

    private dataAuditoriaCustomDate: CustomDate = new CustomDate(this.dataAuditoria);
    private dataHomologacaoCustomDate: CustomDate = new CustomDate(this.dataHomologacao);

    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }
    
    getNumeroDias() {
        return this.numeroDias;
    }

    setNumeroDias(numeroDias: number) {
        this.numeroDias = numeroDias;
    }

    getAnexo() {
        return this.anexo;
    }

    setAnexo(anexo: any) {
        this.anexo = anexo;
    }

    getAnexoBase64() {
        return this.anexoBase64;
    }

    setAnexoBase64(anexoBase64: string) {
        this.anexoBase64 = anexoBase64;
    }

    getAnexoRelatorioMedico() {
        return this.anexo;
    }

    setAnexoRelatorioMedico(anexoRelatorioMedico: any) {
        this.anexoRelatorioMedico = anexoRelatorioMedico;
    }

    getAnexoRelatorioMedicoBase64() {
        return this.anexoRelatorioMedicoBase64;
    }

    setAnexoRelatorioMedicoBase64(anexoRelatorioMedicoBase64: string) {
        this.anexoRelatorioMedicoBase64 = anexoRelatorioMedicoBase64;
    }
    
    getTarefa() {
        return this.tarefa;
    }

    setTarefa(tarefa: Tarefa) {
        this.tarefa = tarefa;
    }

    getImpossibilidadeLocomocao() {
        return this.impossibilidadeLocomocao;
    }

    setImpossibilidadeLocomocao(impossibilidadeLocomocao: boolean) {
        this.impossibilidadeLocomocao = impossibilidadeLocomocao;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
    }

    getLancadoSap() {
        return this.lancadoSap;
    }

    setLancadoSap(lancadoSap: boolean) {
        this.lancadoSap = lancadoSap;
    }

    getAtestadoFisicoRecebido() {
        return this.atestadoFisicoRecebido;
    }

    setAtestadoFisicoRecebido(atestadoFisicoRecebido: boolean) {
        this.atestadoFisicoRecebido = atestadoFisicoRecebido;
    }

    getControleLicenca() {
        return this.controleLicenca;
    }

    setControleLicenca(controleLicenca: boolean) {
        this.controleLicenca = controleLicenca;
    }

    getDataSolicitacao() {
        this.dataSolicitacao = this.dataSolicitacaoCustomDate.getApiDate();
        return this.dataSolicitacao;
    }
    
    setDataSolicitacao(dataSolicitacao: Date) {
        this.dataSolicitacaoCustomDate.setApiDate(dataSolicitacao);
        this.dataSolicitacao = dataSolicitacao;
    }
    
    getDataSolicitacaoCustomDate(){
        return this.dataSolicitacao;
    }
    
    setDataSolicitacaoCustomDate(dataSolicitacaoCustomDate: CustomDate){
        this.dataSolicitacaoCustomDate = dataSolicitacaoCustomDate;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
    getInicio() {
        this.inicio = this.inicioCustomDate.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio:Date) {
        this.inicioCustomDate.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getInicioCustomDate(){
        return this.inicioCustomDate;
    }
    
    setInicioCustomDate(inicioCustomDate: CustomDate){
        this.inicioCustomDate = inicioCustomDate;
    }
    
    getDataInicioEscalaTrabalho() {
        this.dataInicioEscalaTrabalho = this.dataInicioEscalaTrabalhoCustomDate.getApiDate();
        return this.dataInicioEscalaTrabalho;
    }
    
    setDataInicioEscalaTrabalho(dataInicioEscalaTrabalho:Date) {
        this.dataInicioEscalaTrabalhoCustomDate.setApiDate(dataInicioEscalaTrabalho);
        this.dataInicioEscalaTrabalho = dataInicioEscalaTrabalho;
        
        console.log(this.dataInicioEscalaTrabalho);
    }
    
    getDataInicioEscalaTrabalhoCustomDate(){
        return this.dataInicioEscalaTrabalhoCustomDate;
    }
    
    setDataInicioEscalaTrabalhoCustomDate(dataInicioEscalaTrabalhoCustomDate: CustomDate){
        this.dataInicioEscalaTrabalhoCustomDate = dataInicioEscalaTrabalhoCustomDate;
    }
    
    getDataFimEscalaTrabalho() {
        this.dataFimEscalaTrabalho = this.dataFimEscalaTrabalhoCustomDate.getApiDate();
        return this.dataFimEscalaTrabalho;
    }
    
    setDataFimEscalaTrabalho(dataFimEscalaTrabalho:Date) {
        this.dataFimEscalaTrabalhoCustomDate.setApiDate(dataFimEscalaTrabalho);
        this.dataFimEscalaTrabalho = dataFimEscalaTrabalho;
    }
    
    getDataFimEscalaTrabalhoCustomDate(){
        return this.dataFimEscalaTrabalhoCustomDate;
    }
    
    setDataFimEscalaTrabalhoCustomDate(dataFimEscalaTrabalhoCustomDate: CustomDate){
        this.dataFimEscalaTrabalhoCustomDate = dataFimEscalaTrabalhoCustomDate;
    }
    
    getDataInicioFerias() {
        this.dataInicioFerias = this.dataInicioFeriasCustomDate.getApiDate();
        return this.dataInicioFerias;
    }
    
    setDataInicioFerias(dataInicioFerias:Date) {
        this.dataInicioFeriasCustomDate.setApiDate(dataInicioFerias);
        this.dataInicioFerias = dataInicioFerias;
    }
    
    getDataInicioFeriasCustomDate(){
        return this.dataInicioFeriasCustomDate;
    }
    
    setDataInicioFeriasCustomDate(dataInicioFeriasCustomDate: CustomDate){
        this.dataInicioFeriasCustomDate = dataInicioFeriasCustomDate;
    }
    
    getDataFimFerias() {
        this.dataFimFerias = this.dataFimFeriasCustomDate.getApiDate();
        return this.dataFimFerias;
    }
    
    setDataFimFerias(dataFimFerias:Date) {
        this.dataFimFeriasCustomDate.setApiDate(dataFimFerias);
        this.dataFimFerias = dataFimFerias;
    }
    
    getDataFimFeriasCustomDate(){
        return this.dataFimFeriasCustomDate;
    }
    
    setDataFimFeriasCustomDate(dataFimFeriasCustomDate: CustomDate){
        this.dataFimFeriasCustomDate = dataFimFeriasCustomDate;
    }
    
    getContatoMedico() {
        return this.contatoMedico;
    }

    setContatoMedico(contatoMedico) {
        this.contatoMedico = contatoMedico;
    }

    getClinica() {
        return this.clinica;
    }

    setClinica(clinica) {
        this.clinica = clinica;
    }

    getLocalAtendimento() {
        return this.localAtendimento;
    }

    setLocalAtendimento(localAtendimento) {
        this.localAtendimento = localAtendimento;
    }

    getTelefoneExterno() {
        return this.telefoneExterno;
    }

    setTelefoneExterno(telefoneExterno) {
        this.telefoneExterno = telefoneExterno;
    }

    getEmailExterno() {
        return this.emailExterno;
    }

    setEmailExterno(emailExterno) {
        this.emailExterno = emailExterno;
    }
    
    setAposentadoInss(aposentadoInss) {
        this.aposentadoInss = aposentadoInss;
    }
    
    getAposentadoInss() {
        return this.aposentadoInss;
    }
    
    setPresencial(presencial) {
        this.presencial = presencial;
    }
    
    getPresencial() {
        return this.presencial;
    }
    
    setRegime(regime) {
        this.regime = regime;
    }
    
    getRegime() {
        return this.regime;
    }
    
    setPossuiFeriasAgendadas(possuiFeriasAgendadas) {
        this.possuiFeriasAgendadas = possuiFeriasAgendadas;
    }
    
    getPossuiFeriasAgendadas() {
        return this.possuiFeriasAgendadas;
    }
    
    setCiente(ciente) {
        this.ciente = ciente;
    }
    
    getCiente() {
        return this.ciente;
    }

    setEmpregado(empregado) {
        this.empregado = empregado;
    }
    
    getEmpregado() {
        return this.empregado;
    }
    
    setLimiteAuditar(limiteAuditar) {
        this.limiteAuditar = limiteAuditar;
    }
    
    getLimiteAuditar() {
        return this.limiteAuditar;
    }
    
    setLimiteHomologar(limiteHomologar) {
        this.limiteHomologar = limiteHomologar;
    }
    
    getLimiteHomologar() {
        return this.limiteHomologar;
    }
    
    setLimiteLancar(limiteLancar) {
        this.limiteLancar = limiteLancar;
    }
    
    getLimiteLancar() {
        return this.limiteLancar;
    }
    
    getMotivoRecusa() {
        return this.motivoRecusa;
    }

    setMotivoRecusa(motivoRecusa) {
        this.motivoRecusa = motivoRecusa;
    }
    
    getDataLimiteAuditar() {
        this.dataLimiteAuditar = this.dataLimiteAuditarCustomDate.getApiDate();
        return this.dataLimiteAuditar;
    }

    setDataLimiteAuditar(dataLimiteAuditar) {
        this.dataLimiteAuditarCustomDate.setApiDate(dataLimiteAuditar);
        this.dataLimiteAuditar = dataLimiteAuditar;
    }
    
    getDataLimiteAuditarCustomDate(){
        return this.dataLimiteAuditar;
    }
    
    setDataLimiteAuditarCustomDate(dataLimiteAuditar: Date){
        this.dataLimiteAuditar = dataLimiteAuditar;
    }
    
    getDataLimiteAgendamento() {
        this.dataLimiteAgendamento = this.dataLimiteAgendamentoCustomDate.getApiDate();
        return this.dataLimiteAgendamento;
    }
    
    setDataLimiteAgendamento(dataLimiteAgendamento) {
        this.dataLimiteAgendamentoCustomDate.setApiDate(dataLimiteAgendamento);
        this.dataLimiteAgendamento = dataLimiteAgendamento;
    }
    
    getDataLimiteAgendamentoCustomDate(){
        return this.dataLimiteAgendamento;
    }
    
    setDataLimiteAgendamentoCustomDate(dataLimiteAgendamento: Date){
        this.dataLimiteAgendamento = dataLimiteAgendamento;
    }
    
    getDataLimiteLancar() {
        this.dataLimiteLancar = this.dataLimiteLancarCustomDate.getApiDate();
        return this.dataLimiteLancar;
    }

    setDataLimiteLancar(dataLimiteLancar) {
        this.dataLimiteLancarCustomDate.setApiDate(dataLimiteLancar);
        this.dataLimiteLancar = dataLimiteLancar;
    }
    
    getDataLimiteLancarCustomDate(){
        return this.dataLimiteLancar;
    }
    
    setDataLimiteLancarCustomDate(dataLimiteLancar: Date){
        this.dataLimiteLancar = dataLimiteLancar;
    }
    
    getDataLimiteHomologar() {
        this.dataLimiteHomologar = this.dataLimiteHomologarCustomDate.getApiDate();
        return this.dataLimiteHomologar;
    }

    setDataLimiteHomologar(dataLimiteHomologar) {
        this.dataLimiteHomologarCustomDate.setApiDate(dataLimiteHomologar);
        this.dataLimiteHomologar = dataLimiteHomologar;
    }
    
    getDataLimiteHomologarCustomDate(){
        return this.dataLimiteHomologar;
    }
    
    setDataLimiteHomologarCustomDate(dataLimiteHomologar: Date){
        this.dataLimiteHomologar = dataLimiteHomologar;
    }

    getCid() {
        return this.cid;
    }

    setCid(cid) {
        this.cid = cid;
    }
    
    getAgendamento() {
        return this.agendamento;
    }

    setAgendamento(agendamento) {
        this.agendamento = agendamento;
    }
    
    getSomaDiasAtestados() {
        return this.somaDiasAtestados;
    }

    setSomaDiasAtestados(somaDiasAtestados) {
        this.somaDiasAtestados = somaDiasAtestados;
    }

    getConcatenacaoDatasCids() {
        return this.concatenacaoDatasCids;
    }

    setConcatenacaoDatasCids(concatenacaoDatasCids) {
        this.concatenacaoDatasCids = concatenacaoDatasCids;
    }

    getObservacao() {
        return this.observacao;
    }

    setObservacao(observacao) {
        this.observacao = observacao;
    }
    
    getLancamentoSd2000() {
        return this.lancamentoSd2000;
    }
    
    setLancamentoSd2000(lancamentoSd2000) {
        this.lancamentoSd2000 = lancamentoSd2000;
    }
    
    getFim() {
        return this.fim;
    }

    setFim(fim: Date) {
        this.fim = fim;
    }
    
    getExamesConvocacao() {
        return this.examesConvocacao;
    }
    
    setExamesConvocacao(examesConvocacao: Array<Exame>) {
        this.examesConvocacao = examesConvocacao;
    }
    
    getAusenciaExames() {
        return this.ausenciaExames;
    }
    
    setAusenciaExames(ausenciaExames: boolean) {
        this.ausenciaExames = ausenciaExames;
    }
    
    getHistoricoAtestados() {
        return this.historicoAtestados;
    }
    
    setHistoricoAtestados(historicoAtestados: Array<HistoricoAtestado>) {
        this.historicoAtestados = historicoAtestados;
    }
    
    getProfissional() {
        return this.profissional;
    }
    
    setProfissional(profissional: Profissional) {
        this.profissional = profissional;
    }
    
    getPreviewStatus() {
        return this.previewStatus;
    }
    
    setPreviewStatus(previewStatus: string) {
        this.previewStatus = previewStatus;
    }
    
    getDataAuditoria() {
        this.dataAuditoria = this.dataAuditoriaCustomDate.getApiDate();
        return this.dataAuditoria;
    }

    setDataAuditoria(dataAuditoria) {
        this.dataAuditoriaCustomDate.setApiDate(dataAuditoria);
        this.dataAuditoria = dataAuditoria;
    }
    
    getDataAuditoriaCustomDate(){
        return this.dataAuditoria;
    }
    
    setDataAuditoriaCustomDate(dataAuditoria: Date){
        this.dataAuditoria = dataAuditoria;
    }
    
    getConvocado() {
        return this.convocado;
    }

    setConvocado(convocado: boolean) {
        this.convocado = convocado;
    }
    
    getDataHomologacao() {
        this.dataHomologacao = this.dataHomologacaoCustomDate.getApiDate();
        return this.dataHomologacao;
    }

    setDataHomologacao(dataHomologacao) {
        this.dataHomologacaoCustomDate.setApiDate(dataHomologacao);
        this.dataHomologacao = dataHomologacao;
    }
    
    getDataHomologacaoCustomDate(){
        return this.dataHomologacao;
    }
    
    setDataHomologacaoCustomDate(dataHomologacao: Date){
        this.dataHomologacao = dataHomologacao;
    }
    
}