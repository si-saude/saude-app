export class Criterio {
    private id: number = 0;
    private nome: string;
    private tipo: string;
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

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string) {
        this.nome = nome;
    }
    
    getTipo():string{
        return this.tipo;
    }
    
    setTipo(tipo: string){
        this.tipo = tipo;
    }
}