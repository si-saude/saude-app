import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { AtendimentoFilter } from './../atendimento/atendimento.filter';

export class AsoFilter extends GenericFilter {
    private empregado: EmpregadoFilter = new EmpregadoFilter();
    private atendimento: AtendimentoFilter = new AtendimentoFilter();
    private data: DateFilter;
    private validade: DateFilter;
    private status: string;
    private conforme: BooleanFilter;
    private convocado: BooleanFilter;
    
    getEmpregado() {
        return this.empregado;
    }
    setEmpregado(empregado: EmpregadoFilter) {
        this.empregado = empregado;
    }
    getAtendimento() {
        return this.atendimento;
    }
    setAtendimento(atendimento: AtendimentoFilter) {
        this.atendimento = atendimento;
    }
    getData() {
        return this.data;
    }
    setData(data: DateFilter) {
        this.data = data;
    }
    getValidade() {
        return this.validade;
    }
    setValidade(validade: DateFilter) {
        this.validade = validade;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status: string) {
        this.status = status;
    }
    getConforme() {
        return this.conforme;
    }
    setConforme(conforme: BooleanFilter) {
        this.conforme = conforme;
    }
    getConvocado() {
        return this.convocado;
    }
    setConvocado(convocado) {
        this.convocado = convocado;
    }    
}
