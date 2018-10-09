import { GenericFilter } from './../../generics/generic.filter';

export class ClassificacaoGravidadeFilter extends GenericFilter {
    private titulo: string;
    
    constructor() {
        super();
    }

    public getTitulo() {
        return this.titulo;
    }
    
    public setTitulo(t: string) {
        this.titulo = t;
    }   
}