import { AcaoDto } from './acao-dto';

export class AcompanhamentoSastDto {
    private nome: string;
    private matricula: string;
    private gerencia: string;
    private statusRisco: string;
    private statusRPSat: string;
    private equipe: string;
    private indicador: string;
    private diagnostico: string;
    private intervencao: string;
    private idTriagem: number;
    private idAcao: number;
    private acoes: Array<AcaoDto>;
    
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
    getEquipe() {
        return this.equipe;
    }
    setEquipe(equipe) {
        this.equipe = equipe;
    }
    getIndicador() {
        return this.indicador;
    }
    setIndicador(indicador) {
        this.indicador = indicador;
    }
    getDiagnostico() {
        return this.diagnostico;
    }
    setDiagnostico(diagnostico) {
        this.diagnostico = diagnostico;
    }
    getIntervencao() {
        return this.intervencao;
    }
    setIntervencao(intervencao) {
        this.intervencao = intervencao;
    }
    getIdTriagem() {
        return this.idTriagem;
    }
    setIdTriagem(idTriagem) {
        this.idTriagem = idTriagem;
    }
    getIdAcao() {
        return this.idAcao;
    }
    setIdAcao(idAcao) {
        this.idAcao = idAcao;
    }
    getAcoes() {
        return this.acoes;
    }
    setAcoes(acoes) {
        this.acoes = acoes;
    }
    
}
