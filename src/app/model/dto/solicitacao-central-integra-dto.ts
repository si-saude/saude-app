export class SolicitacaoCentralIntegraDto {

    private id: number;
    private nome: string;
    private descricao: string;
    private prazo: string;
    private abertura: string; 
    private status: string;
    private atrasado: boolean;
    private observacao: string;
    private concluido: boolean;
    
    getId() {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome: string) {
        this.nome = nome;
    }
    getDescricao() {
        return this.descricao;
    }
    setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    getPrazo() {
        return this.prazo;
    }
    setPrazo(prazo: string) {
        this.prazo = prazo;
    }
    getAbertura() {
        return this.abertura;
    }
    setAbertura(abertura: string) {
        this.abertura = abertura;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status: string) {
        this.status = status;
    }
    getObservacao() {
        return this.observacao;
    }
    setObservacao(observacao: string) {
        this.observacao = observacao;
    }
    getConcluido() {
        return this.concluido;
    }
    setConcluido(concluido: boolean) {
        this.concluido = concluido;
    }
    getAtrasado() {
        return this.atrasado;
    }
    setAtrasado(atrasado: boolean) {
        this.atrasado = atrasado;
    }
    
}
