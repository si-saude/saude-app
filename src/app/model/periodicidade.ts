export class Periodicidade {
    private id: number;
    private descricao: string;
    private version: number;
    private meses: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
    public getMeses():number{
        return this.meses;
    }
    
    public setMeses(meses:number){
        this.meses = meses;
    }
}
