import { CurriculoCurso } from './../../model/curriculo-curso';
import { Curso } from './../../model/curso';
import { Curriculo } from './../../model/curriculo';
import { CursoBuilder } from './../curso/curso.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class CurriculoCursoBuilder extends GenericBuilder {
    
    initialize(curriculoCurso: CurriculoCurso) {
        curriculoCurso = new CurriculoCurso();
        curriculoCurso.setCurso(new CursoBuilder().initialize(curriculoCurso.getCurso()));
        curriculoCurso.setCurriculo(new Curriculo());
        return curriculoCurso;
    }
    
    initializeList(curriculoCursos: Array<CurriculoCurso>) {
        
        let array:Array<CurriculoCurso> = new Array<CurriculoCurso>();
        
        if(curriculoCursos === null || curriculoCursos === undefined)
            curriculoCursos = new Array<CurriculoCurso>();
        
        for (let curriculoCurso of curriculoCursos) {
            array.push(this.initialize(curriculoCurso));
        }
        
        return array;
    }
    
    cloneList(curriculoCursos: Array<CurriculoCurso>){
        
        if(curriculoCursos === null || curriculoCursos === undefined)
            curriculoCursos = new Array<CurriculoCurso>();
        
        let array:Array<CurriculoCurso> = new Array<CurriculoCurso>();
    
        for (let curriculoCurso of curriculoCursos) {
            array.push(this.clone(curriculoCurso));
        }
    
        return array;
    }
    
    clone(curriculoCurso: CurriculoCurso): CurriculoCurso {
        
        if (curriculoCurso === null || curriculoCurso === undefined)
            curriculoCurso = new CurriculoCurso();
        
        let cloneCurriculoCurso = new CurriculoCurso();
        cloneCurriculoCurso.setId(this.getValue(curriculoCurso, "getId"));
        cloneCurriculoCurso.setVersion(this.getValue(curriculoCurso, "getVersion"));
        cloneCurriculoCurso.setCurso(new CursoBuilder().clone(this.getValue(curriculoCurso, "getCurso")));
        cloneCurriculoCurso.setData(this.getValue(curriculoCurso, "getData"));
        cloneCurriculoCurso.setCurriculo(new Curriculo());
        
        return cloneCurriculoCurso;
    }
    
}