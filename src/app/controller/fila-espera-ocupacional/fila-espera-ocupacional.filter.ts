import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';
import { ServicoFilter } from './../servico/servico.filter';
import { LocalizacaoFilter } from './../localizacao/localizacao.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { RiscoPotencialFilter } from './../risco-potencial/risco-potencial.filter';

export class FilaEsperaOcupacionalFilter extends GenericFilter {

    private servico: ServicoFilter;
    private localizacao: LocalizacaoFilter;
    private empregado: EmpregadoFilter;
    private horarioCheckin: DateFilter;
    private atualizacao: DateFilter;
    private status: string;
    private tempoEspera: number;
    private saida: DateFilter;
    private riscoPotencial: RiscoPotencialFilter;

    getServico() {
        return this.servico;
    }
    setServico(servico: ServicoFilter) {
        this.servico = servico;
    }
    getLocalizacao() {
        return this.localizacao;
    }
    setLocalizacao(localizacao: LocalizacaoFilter) {
        this.localizacao = localizacao;
    }
    getEmpregado() {
        return this.empregado;
    }
    setEmpregado(empregado: EmpregadoFilter) {
        this.empregado = empregado;
    }
    getHorarioCheckin() {
        return this.horarioCheckin;
    }
    setHorarioCheckin(horarioCheckin: DateFilter) {
        this.horarioCheckin = horarioCheckin;
    }
    getAtualizacao() {
        return this.atualizacao;
    }
    setAtualizacao(atualizacao: DateFilter) {
        this.atualizacao = atualizacao;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status: string) {
        this.status = status;
    }
    getTempoEspera() {
        return this.tempoEspera;
    }
    setTempoEspera(tempoEspera: number) {
        this.tempoEspera = tempoEspera;
    }
    getSaida() {
        return this.saida;
    }
    setSaida(saida: DateFilter) {
        this.saida = saida;
    }
    getRiscoPotencial() {
        return this.riscoPotencial;
    }
    setRiscoPotencial(riscoPotencial: RiscoPotencialFilter) {
        this.riscoPotencial = riscoPotencial;
    }
}
