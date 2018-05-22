import { CategoriaRisco } from './../../model/categoria-risco';
import { GenericBuilder } from './../../generics/generic.builder';

export class CategoriaRiscoBuilder extends GenericBuilder {

    initialize(categoriaRisco: CategoriaRisco) {
        categoriaRisco = new CategoriaRisco();
        return categoriaRisco;
    }
    
    clone(categoriaRisco: CategoriaRisco): CategoriaRisco {
        
        if (categoriaRisco === null || categoriaRisco === undefined)
            categoriaRisco = new CategoriaRisco();
        
        let cloneCategoriaRisco = new CategoriaRisco();
        cloneCategoriaRisco.setId(this.getValue(categoriaRisco,"getId"));
        cloneCategoriaRisco.setDescricao(this.getValue(categoriaRisco, "getDescricao"));
        cloneCategoriaRisco.setObservacao(this.getValue(categoriaRisco, "getObservacao"));
        cloneCategoriaRisco.setVersion(this.getValue(categoriaRisco, "getVersion"));
        return cloneCategoriaRisco;
    }
    
}