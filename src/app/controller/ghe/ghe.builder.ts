import { Ghe } from './../../model/ghe';
import { GenericBuilder } from './../../generics/generic.builder';

export class GheBuilder extends GenericBuilder {
    
    initialize(ghe: Ghe): Ghe {
        ghe = new Ghe();
        
        return ghe;
    }
        
   clone(ghe: Ghe): Ghe {        
        let cloneGhe = new Ghe();
        
        if (ghe === null || ghe === undefined)
            ghe = new Ghe();
        
        cloneGhe.setId(this.getValue(ghe, "getId"));
        cloneGhe.setVersion(this.getValue(ghe, "getVersion"));
        cloneGhe.setNome(this.getValue(ghe, "getNome"));
        cloneGhe.setCodigo(this.getValue(ghe, "getCodigo"));
        cloneGhe.setDescricao(this.getValue(ghe, "getDescricao"));
        cloneGhe.setDataCriacao(this.getValue(ghe, "getDataCriacao"));
        cloneGhe.setDataDesativacao(this.getValue(ghe, "getDataDesativacao"));
        cloneGhe.setDescricaoAmbiente(this.getValue(ghe, "getDescricaoAmbiente"));
        cloneGhe.setDescricaoTarefas(this.getValue(ghe, "getDescricaoTarefas"));
        cloneGhe.setDuracaoJornada(this.getValue(ghe, "getDuracaoJornada"));
        
        return cloneGhe;
    } 
    
    
}