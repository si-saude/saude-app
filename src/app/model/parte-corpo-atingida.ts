export class ParteCorpoAtingida {
    private id: number;
    private codigo: string;
    private descricao: string;
    private version: number;

    public getId() {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getCodigo() {
        return this.codigo;
    }

    public setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    public getDescricao() {
        return this.descricao;
    }

    public setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    public getVersion() {
        return this.version;
    }

    public setVersion(version: number) {
        this.version = version;
    }
    
}
