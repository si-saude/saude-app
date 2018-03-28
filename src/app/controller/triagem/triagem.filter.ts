import { GenericFilter } from './../../generics/generic.filter';
import { RiscoEmpregadoFilter } from './../risco-empregado/risco-empregado.filter';
import { EquipeFilter } from './../equipe/equipe.filter';

export class TriagemFilter extends GenericFilter {
    private riscoEmpregado: RiscoEmpregadoFilter;
    private equipeAbordagem: EquipeFilter;
    
    getEquipeAbordagem() {
        return this.equipeAbordagem;
    }
    
    setEquipeAbordagem(equipeAbordagem: EquipeFilter) {
        this.equipeAbordagem = equipeAbordagem;
    }

    getRiscoEmpregado() {
        return this.riscoEmpregado;
    }

    setRiscoEmpregado(riscoEmpregado: RiscoEmpregadoFilter) {
        this.riscoEmpregado = riscoEmpregado;
    }
}
