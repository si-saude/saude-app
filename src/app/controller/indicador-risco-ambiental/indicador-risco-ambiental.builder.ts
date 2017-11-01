import { IndicadorRiscoAmbiental } from './../../model/indicador-risco-ambiental';
import { Periodicidade } from './../../model/periodicidade';
import { PeriodicidadeBuilder } from './../periodicidade/periodicidade.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoAmbientalBuilder extends GenericBuilder{
    
    initialize(indicadorRiscoAmbiental: IndicadorRiscoAmbiental): IndicadorRiscoAmbiental {
        indicadorRiscoAmbiental = new IndicadorRiscoAmbiental();
        
        indicadorRiscoAmbiental.setPeriodicidade(new PeriodicidadeBuilder().initialize(indicadorRiscoAmbiental.getPeriodicidade()));
        
        return indicadorRiscoAmbiental;
    }
    
    clone(indicadorRiscoAmbiental: IndicadorRiscoAmbiental): IndicadorRiscoAmbiental {        
        let cloneIndicadorRiscoAmbiental = new IndicadorRiscoAmbiental();
        
        if (indicadorRiscoAmbiental === null || indicadorRiscoAmbiental === undefined)
            indicadorRiscoAmbiental = new IndicadorRiscoAmbiental();
        
        cloneIndicadorRiscoAmbiental.setId(this.getValue(indicadorRiscoAmbiental, "getId"));
        cloneIndicadorRiscoAmbiental.setVersion(this.getValue(indicadorRiscoAmbiental, "getVersion"));
        cloneIndicadorRiscoAmbiental.setNome(this.getValue(indicadorRiscoAmbiental, "getNome"));
        cloneIndicadorRiscoAmbiental.setCritico(this.getValue(indicadorRiscoAmbiental, "getCritico"));
        cloneIndicadorRiscoAmbiental.setIndice0(this.getValue(indicadorRiscoAmbiental, "getIndice0"));
        cloneIndicadorRiscoAmbiental.setIndice1(this.getValue(indicadorRiscoAmbiental, "getIndice1"));
        cloneIndicadorRiscoAmbiental.setIndice2(this.getValue(indicadorRiscoAmbiental, "getIndice2"));
        cloneIndicadorRiscoAmbiental.setIndice3(this.getValue(indicadorRiscoAmbiental, "getIndice3"));
        cloneIndicadorRiscoAmbiental.setIndice4(this.getValue(indicadorRiscoAmbiental, "getIndice4"));
        cloneIndicadorRiscoAmbiental.setIndice5(this.getValue(indicadorRiscoAmbiental, "getIndice5"));
        
        if(this.getValue(indicadorRiscoAmbiental, "getRequisito") == "")
            cloneIndicadorRiscoAmbiental.setRequisito(undefined);
        else
            cloneIndicadorRiscoAmbiental.setRequisito("");
        
        if (this.getValue(indicadorRiscoAmbiental, "getPeriodicidade") !== undefined) { 
            cloneIndicadorRiscoAmbiental.setPeriodicidade(
                    new PeriodicidadeBuilder().clone(this.getValue(indicadorRiscoAmbiental,"getPeriodicidade")));
            if(!this.idGtZero(cloneIndicadorRiscoAmbiental.getPeriodicidade()))
                cloneIndicadorRiscoAmbiental.setPeriodicidade(undefined);
        } else {
            cloneIndicadorRiscoAmbiental.setPeriodicidade(new PeriodicidadeBuilder().initialize(null));
        }
                
        return cloneIndicadorRiscoAmbiental;
    } 
    
}