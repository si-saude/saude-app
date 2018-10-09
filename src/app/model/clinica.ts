import { Exame } from './exame';

export class Clinica {
    private id: number = 0;
    private nome: string;
    private uf: string;
    private exames: Array<Exame>;
    private version: number;

    getExames(){
        return this.exames;
    }
    
    setExames(exames){
        this.exames = exames; 
    }

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
    
    getUf(): string {
        return this.uf;
    }
    
    setUf(uf: string) {
        this.uf = uf;
    }
}