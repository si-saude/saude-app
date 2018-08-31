import { Empregado } from './empregado';
import { Acao } from './acao';
import { Profissional } from './profissional';
import { RiscoEmpregado } from './risco-empregado';
import { Equipe } from './equipe';
import { CustomDate} from './../generics/utils/custom-date.util';

export class RiscoPotencial {
    private id: number;
    private ranking: number;
    private data: Date;
    private empregado: Empregado;
    private riscoEmpregados: Array<RiscoEmpregado>;
    private equipeResponsavel: Equipe;
    private equipes: Array<Equipe>;
    private condutaPercepcao: string;
    private inicioAgendamento: Date;
    private fimAgendamento: Date;
    private riscosInterdiciplinares: Array<RiscoEmpregado>;
    private valor: number;
    private atual: boolean;
    private statusRPSat: string;
    private version: number;
    private status: string;
    private abreviacaoEquipeAcolhimento: string;
    private acoesDelete: Array<Acao>;
    private profissional: Profissional;

    private fimAgendamentoCustomDate: CustomDate = new CustomDate(this.fimAgendamento);
    private inicioAgendamentoCustomDate: CustomDate = new CustomDate(this.inicioAgendamento);
    private dataCustomDate: CustomDate = new CustomDate(this.data);

    public getId() {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    getData() {
        this.data = this.dataCustomDate.getApiDate();
        return this.data;
    }
    
    setData(data: Date) {
        this.dataCustomDate.setApiDate(data);
        this.data = data;
    }

    getDataCustomDate(){
        return this.dataCustomDate;
    }
    
    setDataCustomDate(dataCustomDate: CustomDate){
        this.dataCustomDate = dataCustomDate;
    }
    
    public getInicioAgendamento() {
        this.inicioAgendamento = this.inicioAgendamentoCustomDate.getApiDate();
        return this.inicioAgendamento;
    }

    public setInicioAgendamento(inicioAgendamento: Date) {
        this.inicioAgendamentoCustomDate.setApiDate(inicioAgendamento);
        this.inicioAgendamento = inicioAgendamento;
    }
    getInicioAgendamentoCustomDate(){
        return this.inicioAgendamentoCustomDate;
    }
    
    setInicioAgendamentoCustomDate(inicioAgendamentoCustomDate: CustomDate){
        this.inicioAgendamentoCustomDate = inicioAgendamentoCustomDate;
    }
    
    
    public getFimAgendamento() {
        this.fimAgendamento = this.fimAgendamentoCustomDate.getApiDate();
        return this.fimAgendamento;
    }

    public setFimAgendamento(fimAgendamento: Date) {
        this.fimAgendamentoCustomDate.setApiDate(fimAgendamento);
        this.fimAgendamento = fimAgendamento;
    }
    
    getFimAgendamentoCustomDate(){
        return this.fimAgendamentoCustomDate;
    }
    
    setFimAgendamentoCustomDate(fimAgendamentoCustomDate: CustomDate){
        this.fimAgendamentoCustomDate = fimAgendamentoCustomDate;
    }

    public getEmpregado() {
        return this.empregado;
    }

    public setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }

    public getRiscoEmpregados() {
        return this.riscoEmpregados;
    }

    public setRiscoEmpregados(riscoEmpregados: Array<RiscoEmpregado>) {
        this.riscoEmpregados = riscoEmpregados;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version: number) {
        this.version = version;
    }

    public setRiscosInterdiciplinares(riscosInterdiciplinares: Array<RiscoEmpregado>) {
        this.riscosInterdiciplinares = riscosInterdiciplinares;
    }
    
    public getRiscosInterdiciplinares() {
        return this.riscosInterdiciplinares;
    }

    public getEquipeResponsavel() {
        return this.equipeResponsavel;
    }

    public setEquipeResponsavel(equipeResponsavel: Equipe) {
        this.equipeResponsavel = equipeResponsavel;
    }

    public getEquipes() {
        return this.equipes;
    }

    public setEquipes(equipes: Array<Equipe>) {
        this.equipes = equipes;
    }

    public getCondutaPercepcao() {
        return this.condutaPercepcao;
    }

    public setCondutaPercepcao(condutaPercepcao: string) {
        this.condutaPercepcao = condutaPercepcao;
    }
    
    public getAtual() {
        return this.atual;
    }
    
    public setAtual(atual: boolean) {
        this.atual = atual;
    }
    
    public getStatusRPSat() {
        return this.statusRPSat;
    }
    
    public setStatusRPSat(statusRPSat: string) {
        this.statusRPSat = statusRPSat;
    }
    
    public getStatus() {
        return this.status;
    }
    
    public setStatus(status: string) {
        this.status = status;
    }
    
    public getAbreviacaoEquipeAcolhimento(){
        return this.abreviacaoEquipeAcolhimento;
    }
    
    public setAbreviacaoEquipeAcolhimento(abreviacao:string){
        this.abreviacaoEquipeAcolhimento = abreviacao;
    }
    
    public getValor() {
        return this.valor;
    }
    
    public setValor(valor: number) {
        this.valor = valor;
    }
    
    public getProfissional() {
        return this.profissional;
    }
    
    public setProfissional(profissional: Profissional) {
        this.profissional = profissional;
    }
    
    public getAcoesDelete() {
        return this.acoesDelete;
    }
    
    public setAcoesDelete(acoesDelete: Array<Acao>) {
        this.acoesDelete = acoesDelete;
    }
    
    public getRanking() {
        return this.ranking;
    }
    
    public setRanking(ranking: number) {
        this.ranking = ranking;
    }
}