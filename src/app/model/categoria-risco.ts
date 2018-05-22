export class CategoriaRisco {
 
    private id: number = 0;
    private descricao: string;
    private observacao: string ;
    private version: number;

    getId(): number {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getVersion(): number {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
    getDescricao(): string {
        return this.descricao;
    }
    
    setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    
    getObservacao(): string {
        return this.observacao;
    }
    
    setObservacao(observacao: string) {
        this.observacao = observacao;
    }
}