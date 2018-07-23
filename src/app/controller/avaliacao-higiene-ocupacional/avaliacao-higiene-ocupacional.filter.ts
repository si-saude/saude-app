import { EmpregadoFilter } from './../empregado/empregado.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class AvaliacaoHigieneOcupacionalFilter extends GenericFilter {
    private brigada: BooleanFilter;
    private espacoConfinado: BooleanFilter;
    private usoVoluntario: BooleanFilter;
    private naoAplicavel: BooleanFilter;
    private naoBarbeado: BooleanFilter;
    private naoUtilizaMascara: BooleanFilter;
    private testeSensibilidadeInsatisfatorio: BooleanFilter;
    private ensaioVedacao: BooleanFilter;
    private empregado: EmpregadoFilter;
    public getEmpregado() {
        return this.empregado;
    }
    public setEmpregado(empregado: EmpregadoFilter) {
        this.empregado = empregado;
    }
    public getEnsaioVedacao() {
        return this.ensaioVedacao;
    }
    public setEnsaioVedacao(ensaioVedacao: BooleanFilter) {
        this.ensaioVedacao = ensaioVedacao;
    }
    public getBrigada() {
        return this.brigada;
    }
    public setBrigada(brigada: BooleanFilter) {
        this.brigada = brigada;
    }
    public getEspacoConfinado() {
        return this.espacoConfinado;
    }
    public setEspacoConfinado(espacoConfinado: BooleanFilter) {
        this.espacoConfinado = espacoConfinado;
    }
    public getUsoVoluntario() {
        return this.usoVoluntario;
    }
    public setUsoVoluntario(usoVoluntario: BooleanFilter) {
        this.usoVoluntario = usoVoluntario;
    }
    public getNaoAplicavel() {
        return this.naoAplicavel;
    }
    public setNaoAplicavel(naoAplicavel: BooleanFilter) {
        this.naoAplicavel = naoAplicavel;
    }
    public getNaoBarbeado() {
        return this.naoBarbeado;
    }
    public setNaoBarbeado(naoBarbeado: BooleanFilter) {
        this.naoBarbeado = naoBarbeado;
    }
    public getNaoUtilizaMascara() {
        return this.naoUtilizaMascara;
    }
    public setNaoUtilizaMascara(naoUtilizaMascara: BooleanFilter) {
        this.naoUtilizaMascara = naoUtilizaMascara;
    }
    public getTesteSensibilidadeInsatisfatorio() {
        return this.testeSensibilidadeInsatisfatorio;
    }
    public setTesteSensibilidadeInsatisfatorio(testeSensibilidadeInsatisfatorio: BooleanFilter) {
        this.testeSensibilidadeInsatisfatorio = testeSensibilidadeInsatisfatorio;
    }
}
