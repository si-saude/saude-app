export class Cat {
    private id: number = 0;
    private numero: string;
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
    
    getNumero(): string {
        return this.numero;
    }
    
    setNumero(numero: string) {
        this.numero = numero;
    }
}