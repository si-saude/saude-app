export class AcaoDto {
    private descricao: string;
    private status: string;
    private tipoAcao: string;
    private contatoAcao: string;
    private acompanhamentos: Array<String>;
    
    getDescricao() {
        return this.descricao;
    }
    setDescricao(descricao) {
        this.descricao = descricao;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
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
    getAcompanhamentos() {
        return this.acompanhamentos;
    }
    setAcompanhamentos(acompanhamentos) {
        this.acompanhamentos = acompanhamentos;
    }
    
}
