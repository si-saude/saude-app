export class ConformidadeAsoDto {
    private nome: string;
    private matricula: string;
    private gerencia: string;
    private base: string;
    private conforme: boolean;
    private dataRealizacao: string;
    private dataValidade: string;
    
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
    getBase() {
        return this.base;
    }
    setBase(base) {
        this.base = base;
    }
    getConforme() {
        return this.conforme;
    }
    setConforme(conforme) {
        this.conforme = conforme;
    }
    getDataRealizacao() {
        return this.dataRealizacao;
    }
    setDataRealizacao(dataRealizacao) {
        this.dataRealizacao = dataRealizacao;
    }
    getDataValidade() {
        return this.dataValidade;
    }
    setDataValidade(dataValidade) {
        this.dataValidade = dataValidade;
    }
}
