export class AcompanhamentoSastAcaoDto {
    private acao: string;
    private tipoAcao: string;
    private contatoAcao: string;
    private statusAcao: string;
    private acompanhamentos: Array<String>;
    
    getAcao() {
        return this.acao;
    }
    setAcao(acao) {
        this.acao = acao;
    }
    getTipoAcao() {
        return this.tipoAcao;
    }
    setTipoAcao(tipoAcao) {
        this.tipoAcao = tipoAcao;
    }
    getContatoAcao() {
        return this.contatoAcao;
    }
    setContatoAcao(contatoAcao) {
        this.contatoAcao = contatoAcao;
    }
    getStatusAcao() {
        return this.statusAcao;
    }
    setStatusAcao(statusAcao) {
        this.statusAcao = statusAcao;
    }
    getAcompanhamentos() {
        return this.acompanhamentos;
    }
    setAcompanhamentos(acompanhamentos) {
        this.acompanhamentos = acompanhamentos;
    }
    
}
