import { Ghee } from './../../model/ghee';
import { GenericBuilder } from './../../generics/generic.builder';

export class GheeBuilder extends GenericBuilder {
    
    initialize(ghee: Ghee): Ghee {
        ghee = new Ghee();
        
        return ghee;
    }
        
   clone(ghee: Ghee): Ghee {        
        let cloneGhee = new Ghee();
        
        if (ghee === null || ghee === undefined)
            ghee = new Ghee();
        
        cloneGhee.setId(this.getValue(ghee, "getId"));
        cloneGhee.setVersion(this.getValue(ghee, "getVersion"));
        cloneGhee.setNome(this.getValue(ghee, "getNome"));
        cloneGhee.setCodigo(this.getValue(ghee, "getCodigo"));
        cloneGhee.setDescricao(this.getValue(ghee, "getDescricao"));
        cloneGhee.setDataCriacao(this.getValue(ghee, "getDataCriacao"));
        cloneGhee.setDataDesativacao(this.getValue(ghee, "getDataDesativacao"));
        
        return cloneGhee;
    } 
    
    
}