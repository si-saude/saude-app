import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { RiscoPotencialFilter } from './../risco-potencial/risco-potencial.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';

export class RiscoEmpregadoFilter extends GenericFilter {
    private riscoPotencial: RiscoPotencialFilter;
    private equipe: EquipeFilter;
    private profissional: ProfissionalSaudeFilter;
    private ativo: BooleanFilter
    private status: string;

    getRiscoPotencial() {
        return this.riscoPotencial;
    }

    setRiscoPotencial(riscoPotencial: RiscoPotencialFilter) {
        this.riscoPotencial = riscoPotencial;
    }

    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: EquipeFilter) {
        this.equipe = equipe;
    }

    getProfissional() {
        return this.profissional;
    }

    setProfissional(profissional: ProfissionalSaudeFilter) {
        this.profissional = profissional;
    }
    
    getAtivo() {
        return this.ativo;
    }

    setAtivo(ativo: BooleanFilter) {
        this.ativo = ativo;
    }
    
    getStatus() {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
    }
    
}
