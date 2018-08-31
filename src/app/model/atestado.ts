import { Profissional } from './profissional';
import { Tarefa } from './tarefa';
import { Cat } from './cat';
import { HomologacaoAtestado } from './homologacao-atestado';
import { Regime } from './regime';
import { Empregado } from './empregado';
import { CustomDate} from './../generics/utils/custom-date.util';

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

    private dataInicioEscalaTrabalhoCustomDate: CustomDate = new CustomDate(this.dataInicioEscalaTrabalho);
    private dataFimEscalaTrabalhoCustomDate: CustomDate = new CustomDate(this.dataFimEscalaTrabalho);
    private dataInicioFeriasCustomDate: CustomDate = new CustomDate(this.dataInicioFerias);
    private dataFimFeriasCustomDate: CustomDate = new CustomDate(this.dataFimFerias);

    private inicioCustomDate: CustomDate = new CustomDate(this.inicio);
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
}