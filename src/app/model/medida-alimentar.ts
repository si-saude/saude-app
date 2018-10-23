export class MedidaAlimentar {
    private id: number = 0;
    private descricao: string;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(i: number) {
        this.id = i;
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
    
    setVersion(v: number) {
        this.version = v;
    }
}