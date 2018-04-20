import { Empregado } from './empregado';
import { Acao } from './acao';
import { Profissional } from './profissional';
import { RiscoEmpregado } from './risco-empregado';
import { Equipe } from './equipe';

export class RiscoPotencial {
    private id: number;
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
    private acoesDelete: Array<Acao>;
    private profissional: Profissional;
    private abreviacaoEquipeAcolhimento: string;

    public getId() {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getData() {
        return this.data;
    }

    public setData(data: Date) {
        this.data = data;
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

    public getInicioAgendamento() {
        return this.inicioAgendamento;
    }

    public setInicioAgendamento(inicioAgendamento: Date) {
        this.inicioAgendamento = inicioAgendamento;
    }

    public getFimAgendamento() {
        return this.fimAgendamento;
    }

    public setFimAgendamento(fimAgendamento: Date) {
        this.fimAgendamento = fimAgendamento;
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
    
    public getAbreviacaoEquipeAcolhimento() {
        return this.abreviacaoEquipeAcolhimento;
    }
    
    public setAbreviacaoEquipeAcolhimento(abreviacaoEquipeAcolhimento: string) {
        this.abreviacaoEquipeAcolhimento = abreviacaoEquipeAcolhimento;
    }
}