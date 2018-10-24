import { AcompanhamentoSastEquipeDto } from './acompanhamento-sast-equipe-dto';

export class AcompanhamentoSastEmpregadoDto {
    private nome: string;
    private matricula: string;
    private gerencia: string;
    private statusRisco: string;
    private statusRPSat: string;
    private equipes: Array<AcompanhamentoSastEquipeDto>;
    
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getMatricula() {
        return this.matricula;
    }
    setMatricula(matricula) {
        this.matricula = matricula;
    }
    getGerencia() {
        return this.gerencia;
    }
    setGerencia(gerencia) {
        this.gerencia = gerencia;
    }
    getStatusRisco() {
        return this.statusRisco;
    }
    setStatusRisco(statusRisco) {
        this.statusRisco = statusRisco;
    }
    getStatusRPSat() {
        return this.statusRPSat;
    }
    setStatusRPSat(statusRPSat) {
        this.statusRPSat = statusRPSat;
    }
    getEquipes() {
        return this.equipes;
    }
    setEquipes(equipes) {
        this.equipes = equipes;
    }
    
}
