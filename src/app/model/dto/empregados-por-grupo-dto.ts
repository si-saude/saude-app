export class EmpregadosPorGrupoDto {
    private nome: string;
    private chave: string;
    private matricula: string;
    private gerencia: string;
    
    getNome() {
        return this.nome;
    }
    setNome(nome: string) {
        this.nome = nome;
    }
    getChave() {
        return this.chave;
    }
    setChave(chave: string) {
        this.chave = chave;
    }
    getMatricula() {
        return this.matricula;
    }
    setMatricula(matricula: string) {
        this.matricula = matricula;
    }
    getGerencia() {
        return this.gerencia;
    }
    setGerencia(gerencia: string) {
        this.gerencia = gerencia;
    }
    
}
