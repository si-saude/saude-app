import { Cidade } from './../../model/cidade';
import { GenericBuilder } from './../../generics/generic.builder';

export class CidadeBuilder extends GenericBuilder {

    initialize(cidade: Cidade) {
        cidade = new Cidade();
        return cidade;
    }
    
    clone(cidade: Cidade): Cidade {
        
        if (cidade === null || cidade === undefined)
            cidade = new Cidade();
        
        let cloneCidade = new Cidade();
        cloneCidade.setId(this.getValue(cidade,"getId"));
        cloneCidade.setNome(this.getValue(cidade, "getNome"));
        cloneCidade.setUf(this.getValue(cidade, "getUf"));
        cloneCidade.setVersion(this.getValue(cidade, "getVersion"));
        return cloneCidade;
    }
    
}