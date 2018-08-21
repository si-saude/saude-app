export class MotivoRecusaAtestado {
    private id: number;
    private descricao: string;
    private permiteReabertura: boolean;
    private version: number;

    public getId() {
        return this.id;
    }

    public setId(id) {
        this.id = id;
    }

    public getDescricao() {
        return this.descricao;
    }

    public setDescricao(descricao) {
        this.descricao = descricao;
    }

    public getPermiteReabertura() {
        return this.permiteReabertura;
    }

    public setPermiteReabertura(permiteReabertura) {
        this.permiteReabertura = permiteReabertura;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version) {
        this.version = version;
    }
    
}
