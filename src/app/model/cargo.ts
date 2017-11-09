import { Curso } from './curso';

export class Cargo {
    private id: number = 0;
    private version: number;
    private nome: string;
    private cursos: Array<Curso>;

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
    
    getCursos():Array<Curso>{
        return this.cursos;
    }
    
    setCursos(cursos:Array<Curso>){
        this.cursos = cursos;
    }
    
}