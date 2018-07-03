import { Tarefa } from './tarefa';
import { DateUtil } from './../generics/utils/date.util';
import { CustomDate} from './../generics/utils/custom-date.util';

export class Atestado {
    private id: number;
    private CID: string;
    private numeroDias: number;
    private anexo: any;
    private anexoBase64: any;
    private tarefa: Tarefa;
    private impossibilidadeLocomocao: boolean;
    private status: string;
    private lancadoSAP: boolean;
    private atestadoFisicoRecebido: boolean;
    private controleLicenca: boolean;
    private dataAgendamento: Date;
    private dataSolicitacao: Date;
    private version: number;

    private dateUtil: DateUtil = new DateUtil();
    private dataAgendamentoCustomDate: CustomDate = new CustomDate(this.dataAgendamento);
    private dataSolicitacaoCustomDate: CustomDate = new CustomDate(this.dataSolicitacao);

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getCID() {
        return this.CID;
    }

    setCID(CID: string) {
        this.CID = CID;
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

    getLancadoSAP() {
        return this.lancadoSAP;
    }

    setLancadoSAP(lancadoSAP: boolean) {
        this.lancadoSAP = lancadoSAP;
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

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
}
