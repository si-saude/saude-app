import { IndicadorRiscoSaudeAmbiental } from './../../model/indicador-risco-saude-ambiental';
import { Periodicidade } from './../../model/periodicidade';
import { PeriodicidadeBuilder } from './../periodicidade/periodicidade.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoSaudeAmbientalBuilder extends GenericBuilder{
    
    initialize(indicadorRiscoSaudeAmbiental: IndicadorRiscoSaudeAmbiental): IndicadorRiscoSaudeAmbiental {
        indicadorRiscoSaudeAmbiental = new IndicadorRiscoSaudeAmbiental();
        
        indicadorRiscoSaudeAmbiental.setPeriodicidade(new PeriodicidadeBuilder().initialize(indicadorRiscoSaudeAmbiental.getPeriodicidade()));
        
        return indicadorRiscoSaudeAmbiental;
    }
    
    clone(indicadorRiscoSaudeAmbiental: IndicadorRiscoSaudeAmbiental): IndicadorRiscoSaudeAmbiental {        
        let cloneIndicadorRiscoSaudeAmbiental = new IndicadorRiscoSaudeAmbiental();
        
        if (indicadorRiscoSaudeAmbiental === null || indicadorRiscoSaudeAmbiental === undefined)
            indicadorRiscoSaudeAmbiental = new IndicadorRiscoSaudeAmbiental();
        
        cloneIndicadorRiscoSaudeAmbiental.setId(this.getValue(indicadorRiscoSaudeAmbiental, "getId"));
        cloneIndicadorRiscoSaudeAmbiental.setVersion(this.getValue(indicadorRiscoSaudeAmbiental, "getVersion"));
        cloneIndicadorRiscoSaudeAmbiental.setNome(this.getValue(indicadorRiscoSaudeAmbiental, "getNome"));
        cloneIndicadorRiscoSaudeAmbiental.setCritico(this.getValue(indicadorRiscoSaudeAmbiental, "getCritico"));
        cloneIndicadorRiscoSaudeAmbiental.setIndice0(this.getValue(indicadorRiscoSaudeAmbiental, "getIndice0"));
        cloneIndicadorRiscoSaudeAmbiental.setIndice1(this.getValue(indicadorRiscoSaudeAmbiental, "getIndice1"));
        cloneIndicadorRiscoSaudeAmbiental.setIndice2(this.getValue(indicadorRiscoSaudeAmbiental, "getIndice2"));
        cloneIndicadorRiscoSaudeAmbiental.setIndice3(this.getValue(indicadorRiscoSaudeAmbiental, "getIndice3"));
        cloneIndicadorRiscoSaudeAmbiental.setIndice4(this.getValue(indicadorRiscoSaudeAmbiental, "getIndice4"));
        cloneIndicadorRiscoSaudeAmbiental.setIndice5(this.getValue(indicadorRiscoSaudeAmbiental, "getIndice5"));
        
        if(this.getValue(indicadorRiscoSaudeAmbiental, "getRequisito") == "")
            cloneIndicadorRiscoSaudeAmbiental.setRequisito(undefined);
        else
            cloneIndicadorRiscoSaudeAmbiental.setRequisito("");
        
        if (this.getValue(indicadorRiscoSaudeAmbiental, "getPeriodicidade") !== undefined) { 
            cloneIndicadorRiscoSaudeAmbiental.setPeriodicidade(
                    new PeriodicidadeBuilder().clone(this.getValue(indicadorRiscoSaudeAmbiental,"getPeriodicidade")));
            if(!this.idGtZero(cloneIndicadorRiscoSaudeAmbiental.getPeriodicidade()))
                cloneIndicadorRiscoSaudeAmbiental.setPeriodicidade(undefined);
        } else {
            cloneIndicadorRiscoSaudeAmbiental.setPeriodicidade(new PeriodicidadeBuilder().initialize(null));
        }
                
        return cloneIndicadorRiscoSaudeAmbiental;
    } 
    
}