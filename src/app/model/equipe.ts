import { Profissional } from './profissional';

export class Equipe {
    private id: number = 0;
    private nome: string;
    private abreviacao: string;
    private coordenador: Profissional;
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
    
    getNome():string{
        return this.nome;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }
    
    getAbreviacao():string{
        return this.abreviacao;
    }
    
    setAbreviacao(abreviacao:string){
        this.abreviacao = abreviacao;
    }
    
    getCoordenador(){
        return this.coordenador;
    }
    
    setCoordenador(coordenador: Profissional){
        this.coordenador = coordenador;
    }
}