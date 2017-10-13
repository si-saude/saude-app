import { Curso } from './curso';
import { Curriculo } from './curriculo';

export class CurriculoCurso {
    private id: number = 0;
    private curriculo: Curriculo;
    private curso: Curso;
    private data: Date;
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
    
    getCurriculo(): Curriculo{
        return this.curriculo;
    }
    
    setCurriculo(curriculo: Curriculo){
        this.curriculo = curriculo;
    }
    
    getCurso(): Curso{
        return this.curso;
    }
    
    setCurso(curso: Curso){
        this.curso = curso;
    }
    
    getData():Date{
        return this.data;
    }
    
    setData(data:Date){
        this.data = data;
    }
} 

