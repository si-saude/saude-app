import { GenericFilter } from './../../generics/generic.filter';

export class RiscoGheFilter extends GenericFilter {
    
    private titulo: string;

    getTitulo(): string {
        return this.titulo;
    }
    
    setTitulo(titulo: string) {
        this.titulo = titulo;
    }
}