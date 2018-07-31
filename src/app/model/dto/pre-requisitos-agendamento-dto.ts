export class PreRequisitosAgendamentoDto {
    private matricula: string;
    private chave: string;
    private nome: string;
    private gerencia: string;
    private base: string;
    private resultadoAuditado: boolean;
    private agendado: number;
    private titulo: string;
    private statusPreclinico: string;
    private datasPreclinico: string;
    private examesPendentes: string;
    
    public getMatricula() {
        return this.matricula;
    }
    public setMatricula(matricula: string) {
        this.matricula = matricula;
    }
    public getChave() {
        return this.chave;
    }
    public setChave(chave: string) {
        this.chave = chave;
    }
    public getNome() {
        return this.nome;
    }
    public setNome(nome: string) {
        this.nome = nome;
    }
    public getGerencia() {
        return this.gerencia;
    }
    public setGerencia(gerencia: string) {
        this.gerencia = gerencia;
    }
    public getBase() {
        return this.base;
    }
    public setBase(base: string) {
        this.base = base;
    }
    public getResultadoAuditado() {
        return this.resultadoAuditado;
    }
    public setResultadoAuditado(resultadoAuditado: boolean) {
        this.resultadoAuditado = resultadoAuditado;
    }
    public getAgendado() {
        return this.agendado;
    }
    public setAgendado(agendado: number) {
        this.agendado = agendado;
    }
    public getTitulo() {
        return this.titulo;
    }
    public setTitulo(titulo: string) {
        this.titulo = titulo;
    }
    public getStatusPreclinico() {
        return this.statusPreclinico;
    }
    public setStatusPreclinico(statusPreclinico: string) {
        this.statusPreclinico = statusPreclinico;
    }
    public getDatasPreclinico() {
        return this.datasPreclinico;
    }
    public setDatasPreclinico(datasPreclinico: string) {
        this.datasPreclinico = datasPreclinico;
    }
    public getExamesPendentes() {
        return this.examesPendentes;
    }
    public setExamesPendentes(examesPendentes: string) {
        this.examesPendentes = examesPendentes;
    }
    
}
