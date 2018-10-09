import { Cidade } from './../../model/cidade';
import { GenericBuilder } from './../../generics/generic.builder';

export class CidadeBuilder extends GenericBuilder {

    initialize(cidade: Cidade) {
        cidade = new Cidade();
        return cidade;
    }
    
    initializeList(cidades: Array<Cidade>) {
        
        let array:Array<Cidade> = new Array<Cidade>();
        
        if(cidades === null || cidades === undefined)
            cidades = new Array<Cidade>();
        
        for (let cidade of cidades) {
            array.push(this.initialize(cidade));
        }
        
        return array;
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
    
    cloneList(cidades: Array<Cidade>): Array<Cidade> {
        let array:Array<Cidade> = new Array<Cidade>();
        if (cidades !== null && cidades !== undefined) { 
            for (let cidade of cidades) {
                array.push(this.clone(cidade));
            }
        }
        
        return array;
    }
    
}