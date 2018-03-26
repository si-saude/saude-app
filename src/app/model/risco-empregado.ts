import { Empregado } from './empregado';
import { Equipe } from './equipe';
import { Triagem } from './triagem';
import { Profissional } from './profissional';
import { RiscoPotencial } from './risco-potencial';

export class RiscoEmpregado {
    private id: number;
    private valor: number;
    private riscoPotencial: RiscoPotencial;
    private empregado: Empregado;
    private equipe: Equipe;
    private triagens: Array<Triagem>;
    private profissional: Profissional;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getValor() {
        return this.valor;
    }

    setValor(valor: number) {
        this.valor = valor;
    }
    
    getRiscoPotencial() {
        return this.riscoPotencial;
    }

    setRiscoPotencial(riscoPotencial: RiscoPotencial) {
        this.riscoPotencial = riscoPotencial;
    }

    getEmpregado() {
        return this.empregado;
    }

    setEmpregado(empregado: Empregado) {
        this.empregado = empregado;
    }

    getEquipe() {
        return this.equipe;
    }

    setEquipe(equipe: Equipe) {
        this.equipe = equipe;
    }

    getTriagens() {
        return this.triagens;
    }

    setTriagens(triagens: Array<Triagem>) {
        this.triagens = triagens;
    }
    
    getProfissional() {
        return this.profissional;
    }

    setProfissional(profissional: Profissional) {
        this.profissional = profissional;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
}
