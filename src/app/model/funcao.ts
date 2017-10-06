import { Curso } from './curso';
import { Vacina } from './vacina';

export class Funcao {
    private id: number;
    private version: number;
    private nome: string;
    private cursos: Array<Curso>;
    private vacinas: Array<Vacina>;

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
    
    getVacinas():Array<Vacina>{
        return this.vacinas;
    }
    
    setVacinas(vacinas:Array<Vacina>){
        this.vacinas = vacinas;
    }
}