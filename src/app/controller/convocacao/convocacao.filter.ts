import { GenericFilter } from './../../generics/generic.filter';
import { ProfissiogramaFilter } from './../profissiograma/profissiograma.filter';

export class ConvocacaoFilter extends GenericFilter {
    private titulo: string;
    private tipo: string;
    private profissiograma: ProfissiogramaFilter;
    
    public getTitulo() {
        return this.titulo;
    }
    
    public setTitulo(titulo: string) {
        this.titulo = titulo;
    }
    
    public getTipo() {
        return this.tipo;
    }
    
    public setTipo(tipo: string) {
        this.tipo = tipo;
    }
    
    public getProfissiograma() {
        return this.profissiograma;
    }
    
    public setProfissiograma(profissiograma: ProfissiogramaFilter) {
        this.profissiograma = profissiograma;
    }

}