export class SugestaoAgendamentoDto {
    private id: number;
    private gerencia: string;
    private nome: string;
    private matricula: string;
    private data: String; 
    private validade: String;
    private sugestao: String;
    public getId() {
        return this.id;
    }
    public setId(id) {
        this.id = id;
    }
    public getGerencia() {
        return this.gerencia;
    }
    public setGerencia(gerencia) {
        this.gerencia = gerencia;
    }
    public getNome() {
        return this.nome;
    }
    public setNome(nome) {
        this.nome = nome;
    }
    public getMatricula() {
        return this.matricula;
    }
    public setMatricula(matricula) {
        this.matricula = matricula;
    }
    public getData() {
        return this.data;
    }
    public setData(data) {
        this.data = data;
    }
    public getSugestao() {
        return this.sugestao;
    }
    public setSugestao(sugestao) {
        this.sugestao = sugestao;
    }
    public getValidade() {
        return this.validade;
    }
    public setValidade(validade) {
        this.validade = validade;
    }
}