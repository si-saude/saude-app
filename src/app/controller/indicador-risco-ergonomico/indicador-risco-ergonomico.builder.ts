import { IndicadorRiscoErgonomico } from './../../model/indicador-risco-ergonomico';
import { Periodicidade } from './../../model/periodicidade';
import { PeriodicidadeBuilder } from './../periodicidade/periodicidade.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoErgonomicoBuilder extends GenericBuilder{
    
    initialize(indicadorRiscoErgonomico: IndicadorRiscoErgonomico): IndicadorRiscoErgonomico {
        indicadorRiscoErgonomico = new IndicadorRiscoErgonomico();
        
        indicadorRiscoErgonomico.setPeriodicidade(new PeriodicidadeBuilder().initialize(indicadorRiscoErgonomico.getPeriodicidade()));
        
        return indicadorRiscoErgonomico;
    }
    
    clone(indicadorRiscoErgonomico: IndicadorRiscoErgonomico): IndicadorRiscoErgonomico {        
        let cloneIndicadorRiscoErgonomico = new IndicadorRiscoErgonomico();
        
        if (indicadorRiscoErgonomico === null || indicadorRiscoErgonomico === undefined)
            indicadorRiscoErgonomico = new IndicadorRiscoErgonomico();
        
        cloneIndicadorRiscoErgonomico.setId(this.getValue(indicadorRiscoErgonomico, "getId"));
        cloneIndicadorRiscoErgonomico.setVersion(this.getValue(indicadorRiscoErgonomico, "getVersion"));
        cloneIndicadorRiscoErgonomico.setNome(this.getValue(indicadorRiscoErgonomico, "getNome"));
        cloneIndicadorRiscoErgonomico.setCritico(this.getValue(indicadorRiscoErgonomico, "getCritico"));
        cloneIndicadorRiscoErgonomico.setIndice0(this.getValue(indicadorRiscoErgonomico, "getIndice0"));
        cloneIndicadorRiscoErgonomico.setIndice1(this.getValue(indicadorRiscoErgonomico, "getIndice1"));
        cloneIndicadorRiscoErgonomico.setIndice2(this.getValue(indicadorRiscoErgonomico, "getIndice2"));
        cloneIndicadorRiscoErgonomico.setIndice3(this.getValue(indicadorRiscoErgonomico, "getIndice3"));
        cloneIndicadorRiscoErgonomico.setIndice4(this.getValue(indicadorRiscoErgonomico, "getIndice4"));
        cloneIndicadorRiscoErgonomico.setIndice5(this.getValue(indicadorRiscoErgonomico, "getIndice5"));
        
        if(this.getValue(indicadorRiscoErgonomico, "getRequisito") == "")
            cloneIndicadorRiscoErgonomico.setRequisito(undefined);
        else
            cloneIndicadorRiscoErgonomico.setRequisito("");
        
        if (this.getValue(indicadorRiscoErgonomico, "getPeriodicidade") !== undefined) { 
            cloneIndicadorRiscoErgonomico.setPeriodicidade(
                    new PeriodicidadeBuilder().clone(this.getValue(indicadorRiscoErgonomico,"getPeriodicidade")));
            if(!this.idGtZero(cloneIndicadorRiscoErgonomico.getPeriodicidade()))
                cloneIndicadorRiscoErgonomico.setPeriodicidade(undefined);
        } else {
            cloneIndicadorRiscoErgonomico.setPeriodicidade(new PeriodicidadeBuilder().initialize(null));
        }
                
        return cloneIndicadorRiscoErgonomico;
    } 
    
}