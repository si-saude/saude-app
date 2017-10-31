import { Profissiograma } from './../../model/profissiograma';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento/grupo-monitoramento.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ProfissiogramaBuilder extends GenericBuilder{
    
    initialize(profissiograma: Profissiograma): Profissiograma {
        profissiograma = new Profissiograma();
        
        profissiograma.setGrupoMonitoramentos(new GrupoMonitoramentoBuilder().initializeList(profissiograma.getGrupoMonitoramentos()));
        
        return profissiograma;
    }
    
    clone(profissiograma: Profissiograma): Profissiograma {
        let cloneProfissiograma = new Profissiograma();
        
        if (profissiograma === null || profissiograma === undefined)
            profissiograma = new Profissiograma();
        
        cloneProfissiograma.setId(this.getValue(profissiograma, "getId"));
        cloneProfissiograma.setVersion(this.getValue(profissiograma, "getVersion"));
        cloneProfissiograma.setNome(this.getValue(profissiograma, "getNome"));
        cloneProfissiograma.setConcluido(this.getValue(profissiograma, "getConcluido"));
        
        cloneProfissiograma.setGrupoMonitoramentos(
                new GrupoMonitoramentoBuilder().cloneList(this.getValue(profissiograma, "getGrupoMonitoramentos")));
        
        return cloneProfissiograma;
    }
}