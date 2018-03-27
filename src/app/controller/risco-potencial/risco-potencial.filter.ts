import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { EquipeFilter } from './../equipe/equipe.filter';

export class RiscoPotencialFilter extends GenericFilter {
    
    private data: DateFilter;
    private empregado: EmpregadoFilter;
    private equipeResponsavel: EquipeFilter;
    private condutaPercepcao: string;
    private inicioAgendamento: DateFilter;
    private fimAgendamento: DateFilter;
    private atual: BooleanFilter;
    private status: string;

    public getEmpregado() {
        return this.empregado;
    }
    public setEmpregado(empregado: EmpregadoFilter) {
        this.empregado = empregado;
    }
    public getData() {
        return this.data;
    }
    public setData(data: DateFilter) {
        this.data = data;
    }
    public getEquipeResponsavel() {
        return this.equipeResponsavel;
    }
    public setEquipeResponsavel(equipeResponsavel: EquipeFilter) {
        this.equipeResponsavel = equipeResponsavel;
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
    public setInicioAgendamento(inicioAgendamento: DateFilter) {
        this.inicioAgendamento = inicioAgendamento;
    }
    public getFimAgendamento() {
        return this.fimAgendamento;
    }
    public setFimAgendamento(fimAgendamento: DateFilter) {
        this.fimAgendamento = fimAgendamento;
    }
    public getAtual() {
        return this.atual;
    }
    public setAtual(atual: BooleanFilter) {
        this.atual = atual;
    }
    public getStatus(){
        return this.status;
    }
    public setStatus(status: string){
        this.status = status;
    }
}