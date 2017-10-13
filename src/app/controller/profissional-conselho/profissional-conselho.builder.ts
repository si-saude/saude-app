import { ProfissionalConselho } from './../../model/profissional-conselho';
import { GenericBuilder } from './../../generics/generic.builder';

export class ProfissionalConselhoBuilder extends GenericBuilder {
    
    initialize(profissionalConselho: ProfissionalConselho) {
        profissionalConselho = new ProfissionalConselho();
        return profissionalConselho;
    }
    
    clone(profissionalConselho: ProfissionalConselho): ProfissionalConselho {
        if (profissionalConselho === null || profissionalConselho === undefined)
            profissionalConselho = new ProfissionalConselho();
        
        let cloneProfissionalConselho = new ProfissionalConselho();
        cloneProfissionalConselho.setId(this.getValue(profissionalConselho,"getId"));
        cloneProfissionalConselho.setVersion(this.getValue(profissionalConselho,"getVersion"));
        cloneProfissionalConselho.setConselho(this.getValue(profissionalConselho,"getConselho"));
        cloneProfissionalConselho.setNumero(this.getValue(profissionalConselho,"getNumero"));
        cloneProfissionalConselho.setUf(this.getValue(profissionalConselho,"getUf"));
        cloneProfissionalConselho.setVencimento(this.getValue(profissionalConselho,"getVencimento"));
        
        return cloneProfissionalConselho; 
    }
    
}

