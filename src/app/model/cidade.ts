export class Cidade {
    private id: number = 0;
    private nome: string;
    private uf: string;
    private version: number;

    getId(): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getUf(): string {
        return this.uf;
    }

    setUf(uf: string) {
        this.uf = uf;
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
}
