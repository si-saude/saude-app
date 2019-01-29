export class AtividadeFisica {
    private id: number;
    private descricao: string;
    private version: number;
    
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }
    
    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao) {
        this.descricao = descricao;
    }
    
    getVersion() {
        return this.version;
    }

    setVersion(version) {
        this.version = version;
    }

}
