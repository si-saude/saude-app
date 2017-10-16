import { Curso } from './../../model/curso';
import { GenericBuilder } from './../../generics/generic.builder';

export class CursoBuilder extends GenericBuilder {
    
    initialize(curso: Curso) {
        curso = new Curso();
        return curso;
    }
    
    initializeList(cursos: Array<Curso>) {
        
        let array:Array<Curso> = new Array<Curso>();
        
        if(cursos === null || cursos === undefined)
            cursos = new Array<Curso>();
        
        for (let curso of cursos) {
            array.push(this.initialize(curso));
        }
        
        return array;
    }
    
    clone(curso: Curso): Curso {
        
        if (curso === null || curso === undefined)
            curso = new Curso();
        
        let cloneCurso = new Curso();
        cloneCurso.setId(this.getValue(curso,"getId"));
        cloneCurso.setVersion(this.getValue(curso,"getVersion"));
        cloneCurso.setNome(this.getValue(curso,"getNome"));
        cloneCurso.setValidade(this.getValue(curso,"getValidade"));
        cloneCurso.setDescricao(this.getValue(curso,"getDescricao"));
        
        return cloneCurso;
    }
    
    cloneList(cursos: Array<Curso>): Array<Curso> {
        let array:Array<Curso> = new Array<Curso>();
    
        if (cursos !== null && cursos !== undefined) { 
            for (let curso of cursos) {
                array.push(this.clone(curso));
            }
        }
        
        return array;
    }
    
}