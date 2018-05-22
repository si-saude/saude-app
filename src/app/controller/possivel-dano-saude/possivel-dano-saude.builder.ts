import { PossivelDanoSaude } from './../../model/possivel-dano-saude';
import { GenericBuilder } from './../../generics/generic.builder';

export class PossivelDanoSaudeBuilder extends GenericBuilder {

    initialize(possivelDanoSaude: PossivelDanoSaude) {
        possivelDanoSaude = new PossivelDanoSaude();
        return possivelDanoSaude;
    }
    
    clone(possivelDanoSaude: PossivelDanoSaude): PossivelDanoSaude {
        
        if (possivelDanoSaude === null || possivelDanoSaude === undefined)
            possivelDanoSaude = new PossivelDanoSaude();
        
        let clonePossivelDanoSaude = new PossivelDanoSaude();
        clonePossivelDanoSaude.setId(this.getValue(possivelDanoSaude,"getId"));
        clonePossivelDanoSaude.setDescricao(this.getValue(possivelDanoSaude, "getDescricao"));
        clonePossivelDanoSaude.setVersion(this.getValue(possivelDanoSaude, "getVersion"));
        return clonePossivelDanoSaude;
    }
    
}