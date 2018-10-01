export class ClassificacaoGravidade {
    private id: number = 0;
    private titulo: string;
    private version: number;

    getId(): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getTitulo(): string {
        return this.titulo;
    }

    setTitulo(titulo: string) {
        this.titulo = titulo;
    }

    getVersion(): number {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
}
