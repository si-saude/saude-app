import { TipoSolicitacao } from './tipo-solicitacao';
import { Tarefa } from './tarefa';
import { DateUtil } from './../generics/utils/date.util';
import { CustomDate} from './../generics/utils/custom-date.util';

export class SolicitacaoCentralIntegra {
    private id: number = 0;
    private descricao: string;
    private observacao: string;
    private tipoSolicitacao: TipoSolicitacao;
    private tarefa: Tarefa;
    private status: string;
    private tempoEstimado: number;
    private tempoGasto: number;
    private prazo: Date;
    private abertura: Date;
    private concluido: boolean;
    private anexo: any;
    private anexoBase64: string;
    private prazoString: string;
    private aberturaString: string;
    private atrasado: boolean;
    private version: number;

    private dateUtil: DateUtil = new DateUtil();
    private prazoCustomDate: CustomDate = new CustomDate(this.prazo);
    private aberturaCustomDate: CustomDate = new CustomDate(this.abertura);

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    getObservacao() {
        return this.observacao;
    }

    setObservacao(observacao: string) {
        this.observacao = observacao;
    }

    getTipoSolicitacao() {
        return this.tipoSolicitacao;
    }

    setTipoSolicitacao(tipoSolicitacao: TipoSolicitacao) {
        this.tipoSolicitacao = tipoSolicitacao;
    }

    getTarefa() {
        return this.tarefa;
    }

    setTarefa(tarefa: Tarefa) {
        this.tarefa = tarefa;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
    }

    getTempoEstimado() {
        return this.tempoEstimado;
    }

    setTempoEstimado(tempoEstimado: number) {
        this.tempoEstimado = tempoEstimado;
    }

    getTempoGasto() {
        return this.tempoGasto;
    }

    setTempoGasto(tempoGasto: number) {
        this.tempoGasto = tempoGasto;
    }

    getPrazo() {
        this.prazo = this.prazoCustomDate.getApiDate();
        return this.prazo;
    }
    
    setPrazo(prazo: Date) {
        this.prazoCustomDate.setApiDate(prazo);
        this.prazo = prazo;
    }
    
    getPrazoCustomDate(){
        return this.prazo;
    }
    
    setPrazoCustomDate(prazoCustomDate: CustomDate){
        this.prazoCustomDate = prazoCustomDate;
    }

    getAbertura() {
        this.abertura = this.aberturaCustomDate.getApiDate();
        return this.abertura;
    }
    
    setAbertura(abertura: Date) {
        this.aberturaCustomDate.setApiDate(abertura);
        this.abertura = abertura;
    }
    
    getAberturaCustomDate(){
        return this.abertura;
    }
    
    setAberturaCustomDate(aberturaCustomDate: CustomDate){
        this.aberturaCustomDate = aberturaCustomDate;
    }

    getConcluido() {
        return this.concluido;
    }

    setConcluido(concluido: boolean) {
        this.concluido = concluido;
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

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
    setPrazoString(prazoString: string) {
        this.prazoString = prazoString;
    }
    
    getPrazoString() {
        this.prazoString = this.dateUtil.parseDataToString(this.prazo);
        return this.prazoString;
    }
    
    setAberturaString(aberturaString: string) {
        this.aberturaString = aberturaString;
    }
    
    getAberturaString() {
        this.aberturaString = this.dateUtil.parseDataToString(this.abertura);
        return this.aberturaString;
    }
    
    getAtrasado() {
        return this.atrasado;
    }
    
    setAtrasado(atrasado: boolean) {
        this.atrasado = atrasado;
    }
    
}
