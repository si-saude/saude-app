import { GenericFilter } from './../../generics/generic.filter';
import { RiscoEmpregadoFilter } from './../risco-empregado/risco-empregado.filter';

export class TriagemFilter extends GenericFilter {
    private riscoEmpregado: RiscoEmpregadoFilter;

    getRiscoEmpregado() {
        return this.riscoEmpregado;
    }

    setRiscoEmpregado(riscoEmpregado: RiscoEmpregadoFilter) {
        this.riscoEmpregado = riscoEmpregado;
    }
}
