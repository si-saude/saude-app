export class Localizacao {
    id: number;
    version: number;
    nome: string;

    getId() {
        return this.id;
    }
    
    setId(i: number) {
        this.id = i;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(v: number) {
        this.version = v;
    }
    
    getNome() {
        return this.nome;
    }
    
    setNome(n: string) {
        this.nome = n;
    }
}