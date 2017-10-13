import { Curriculo } from './../../model/curriculo';
import { CurriculoCurso } from './../../model/curriculo-curso';
import { CurriculoCursoBuilder } from './../curriculo-curso/curriculo-curso.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class CurriculoBuilder extends GenericBuilder {
    
    initialize(curriculo: Curriculo) {
        curriculo = new Curriculo();
        curriculo.setCurriculoCursos(new CurriculoCursoBuilder().initializeList(curriculo.getCurriculoCursos()));
        return curriculo;
    }
    
    initializeList(curriculos: Array<Curriculo>) {
        
        let array: Array<Curriculo> = new Array<Curriculo>();
        
        if(curriculos === null || curriculos === undefined)
            curriculos = new  Array<Curriculo>();
        
        for (let curriculo of curriculos) {
            array.push(this.initialize(curriculo));
        }
        
        return array;
    }
    
    clone(curriculo: Curriculo): Curriculo {
        
        if (curriculo === null || curriculo === undefined)
            curriculo = new Curriculo();
        
        let cloneCurriculo = new Curriculo();
        cloneCurriculo.setId(this.getValue(curriculo,"getId"));
        cloneCurriculo.setVersion(this.getValue(curriculo,"getVersion"));
        cloneCurriculo.setAtuacao(this.getValue(curriculo,"getAtuacao"));        
        cloneCurriculo.setFormacao(this.getValue(curriculo,"getFormacao"));
        cloneCurriculo.setHistorico(this.getValue(curriculo,"getHistorico"));
        cloneCurriculo.setCurriculoCursos(new CurriculoCursoBuilder().cloneList(this.getValue(curriculo,"getCurriculoCursos")));
        
        return cloneCurriculo;
    }
    
}