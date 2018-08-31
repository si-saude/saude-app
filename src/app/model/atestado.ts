import { Profissional } from './profissional';
import { Tarefa } from './tarefa';
import { Cat } from './cat';
import { HomologacaoAtestado } from './homologacao-atestado';
import { Regime } from './regime';
import { Empregado } from './empregado';
import { CustomDate} from './../generics/utils/custom-date.util';
import { CustomTime} from './../generics/utils/custom-time.util';

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
    private dataAgendamento: Date;
    private dataSolicitacao: Date;
    private cat: Cat;
    private homologacaoAtestado: HomologacaoAtestado;
    private inicio: Date;
    private contatoMedico: string;
    private clinica: string;
    private localAtendimento: string;
    private telefoneExterno: string;
    private emailExterno: string;
    private cid: string;
    
    private tipoBeneficio: string;
    private causaAfastamento: string; 
    private profissionalRealizouVisita: Profissional;
    private ultimoContato: string;
    private proximoContato: string;
    private situacaoEmpregado: string;
    
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

    private dataInicioEscalaTrabalhoCustomTime: CustomTime = new CustomTime(this.dataInicioEscalaTrabalho);
    private dataFimEscalaTrabalhoCustomTime: CustomTime = new CustomTime(this.dataFimEscalaTrabalho);
    private dataInicioFeriasCustomTime: CustomTime = new CustomTime(this.dataInicioFerias);
    private dataFimFeriasCustomTime: CustomTime = new CustomTime(this.dataFimFerias);

    private inicioCustomTime: CustomTime = new CustomTime(this.inicio);
    private dataAgendamentoCustomDate: CustomDate = new CustomDate(this.dataAgendamento);
    private dataSolicitacaoCustomDate: CustomDate = new CustomDate(this.dataSolicitacao);

    private anexoRelatorioMedico: any;
    private anexoRelatorioMedicoBase64: any;
    private limiteAuditar: number;
    private limiteHomologar: number;
    private limiteLancar: number;

    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }
    
    getCid() {
        return this.cid;
    }
    
    setCid(cid) {
        this.cid = cid;
    }

    getCat() {
        return this.cat;
    }

    setCat(cat: Cat) {
        this.cat = cat;
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

    getDataAgendamento() {
        this.dataAgendamento = this.dataAgendamentoCustomDate.getApiDate();
        return this.dataAgendamento;
    }
    
    setDataAgendamento(dataAgendamento: Date) {
        this.dataAgendamentoCustomDate.setApiDate(dataAgendamento);
        this.dataAgendamento = dataAgendamento;
    }
    
    getDataAgendamentoCustomDate(){
        return this.dataAgendamento;
    }
    
    setDataAgendamentoCustomDate(dataAgendamentoCustomDate: CustomDate){
        this.dataAgendamentoCustomDate = dataAgendamentoCustomDate;
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

    getTipoBeneficio() {
        return this.tipoBeneficio;
    }

    setTipoBeneficio(tipoBeneficio: string) {
        this.tipoBeneficio = tipoBeneficio;
    }

    getCausaAfastamento() {
        return this.causaAfastamento;
    }

    setCausaAfastamento(causaAfastamento: string) {
        this.causaAfastamento = causaAfastamento;
    }

    getProfissionalRealizouVisita() {
        return this.profissionalRealizouVisita;
    }

    setProfissionalRealizouVisita(profissionalRealizouVisita: Profissional) {
        this.profissionalRealizouVisita = profissionalRealizouVisita;
    }

    getUltimoContato() {
        return this.ultimoContato;
    }

    setUltimoContato(ultimoContato: string) {
        this.ultimoContato = ultimoContato;
    }

    getProximoContato() {
        return this.proximoContato;
    }

    setProximoContato(proximoContato: string) {
        this.proximoContato = proximoContato;
    }

    getSituacaoEmpregado() {
        return this.situacaoEmpregado;
    }

    setSituacaoEmpregado(situacaoEmpregado: string) {
        this.situacaoEmpregado = situacaoEmpregado;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
    getHomologacaoAtestado() {
        return this.homologacaoAtestado;
    }

    setHomologacaoAtestado(homologacaoAtestado: HomologacaoAtestado) {
        this.homologacaoAtestado = homologacaoAtestado;
    }
    
    getInicio() {
        this.inicio = this.inicioCustomTime.getApiDate();
        return this.inicio;
    }
    
    setInicio(inicio:Date) {
        this.inicioCustomTime.setApiDate(inicio);
        this.inicio = inicio;
    }
    
    getInicioCustomTime(){
        return this.inicioCustomTime;
    }
    
    setInicioCustomTime(inicioCustomTime: CustomTime){
        this.inicioCustomTime = inicioCustomTime;
    }
    
    getDataInicioEscalaTrabalho() {
        this.dataInicioEscalaTrabalho = this.dataInicioEscalaTrabalhoCustomTime.getApiDate();
        return this.dataInicioEscalaTrabalho;
    }
    
    setDataInicioEscalaTrabalho(dataInicioEscalaTrabalho:Date) {
        this.dataInicioEscalaTrabalhoCustomTime.setApiDate(dataInicioEscalaTrabalho);
        this.dataInicioEscalaTrabalho = dataInicioEscalaTrabalho;
    }
    
    getDataInicioEscalaTrabalhoCustomTime(){
        return this.dataInicioEscalaTrabalhoCustomTime;
    }
    
    setDataInicioEscalaTrabalhoCustomTime(dataInicioEscalaTrabalhoCustomTime: CustomTime){
        this.dataInicioEscalaTrabalhoCustomTime = dataInicioEscalaTrabalhoCustomTime;
    }
    
    getDataFimEscalaTrabalho() {
        this.dataFimEscalaTrabalho = this.dataFimEscalaTrabalhoCustomTime.getApiDate();
        return this.dataFimEscalaTrabalho;
    }
    
    setDataFimEscalaTrabalho(dataFimEscalaTrabalho:Date) {
        this.dataFimEscalaTrabalhoCustomTime.setApiDate(dataFimEscalaTrabalho);
        this.dataFimEscalaTrabalho = dataFimEscalaTrabalho;
    }
    
    getDataFimEscalaTrabalhoCustomTime(){
        return this.dataFimEscalaTrabalhoCustomTime;
    }
    
    setDataFimEscalaTrabalhoCustomTime(dataFimEscalaTrabalhoCustomTime: CustomTime){
        this.dataFimEscalaTrabalhoCustomTime = dataFimEscalaTrabalhoCustomTime;
    }
    
    getDataInicioFerias() {
        this.dataInicioFerias = this.dataInicioFeriasCustomTime.getApiDate();
        return this.dataInicioFerias;
    }
    
    setDataInicioFerias(dataInicioFerias:Date) {
        this.dataInicioFeriasCustomTime.setApiDate(dataInicioFerias);
        this.dataInicioFerias = dataInicioFerias;
    }
    
    getDataInicioFeriasCustomTime(){
        return this.dataInicioFeriasCustomTime;
    }
    
    setDataInicioFeriasCustomTime(dataInicioFeriasCustomTime: CustomTime){
        this.dataInicioFeriasCustomTime = dataInicioFeriasCustomTime;
    }
    
    getDataFimFerias() {
        this.dataFimFerias = this.dataFimFeriasCustomTime.getApiDate();
        return this.dataFimFerias;
    }
    
    setDataFimFerias(dataFimFerias:Date) {
        this.dataFimFeriasCustomTime.setApiDate(dataFimFerias);
        this.dataFimFerias = dataFimFerias;
    }
    
    getDataFimFeriasCustomTime(){
        return this.dataFimFeriasCustomTime;
    }
    
    setDataFimFeriasCustomTime(dataFimFeriasCustomTime: CustomTime){
        this.dataFimFeriasCustomTime = dataFimFeriasCustomTime;
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
}