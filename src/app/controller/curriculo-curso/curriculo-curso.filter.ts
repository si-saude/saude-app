import { GenericFilter } from './../../generics/generic.filter';
import { DateFilter } from './../../generics/date.filter';
import { CurriculoFilter } from './../curriculo/curriculo.filter';
import { CursoFilter } from './../curso/curso.filter';

export class CurriculoCursoFilter extends GenericFilter {
    
    private curriculo: CurriculoFilter;
    private curso: CursoFilter;
    private data: DateFilter;

    getCurriculo() {
        return this.curriculo;
    }
    setCurriculo(curriculo: CurriculoFilter) {
        this.curriculo = curriculo;
    }
    getCurso() {
        return this.curso;
    }
    setCurso(curso: CursoFilter) {
        this.curso = curso;
    }
    getData() {
        return this.data;
    }
    setData(data: DateFilter) {
        this.data = data;
    }
}
