import { GenericFilter } from './../../generics/generic.filter';

export class PerfilFilter extends GenericFilter {
    private titulo: string;

    public getTitulo() {
        return this.titulo;
    }
    
    public setTitulo(t: string) {
        this.titulo = t;
    }
    
}