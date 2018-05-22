export class AgenteRisco {
 
    private id: number = 0;
    private descricao: string;
    private categoriaAgenteRisco: string = '';
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
    
    getCategoriaAgenteRisco(): string {
        return this.categoriaAgenteRisco;
    }
    
    setCategoriaAgenteRisco(categoriaAgenteRisco: string) {
        this.categoriaAgenteRisco = categoriaAgenteRisco;
    }
}