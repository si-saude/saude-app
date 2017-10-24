import { IndicadorRiscoAcidente } from './../../model/indicador-risco-acidente';
import { Periodicidade } from './../../model/periodicidade';
import { PeriodicidadeBuilder } from './../periodicidade/periodicidade.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoAcidenteBuilder extends GenericBuilder{
    
    initialize(indicadorRiscoAcidente: IndicadorRiscoAcidente): IndicadorRiscoAcidente {
        indicadorRiscoAcidente = new IndicadorRiscoAcidente();
        
        indicadorRiscoAcidente.setPeriodicidade(new PeriodicidadeBuilder().initialize(indicadorRiscoAcidente.getPeriodicidade()));
        
        return indicadorRiscoAcidente;
    }
    
    clone(indicadorRiscoAcidente: IndicadorRiscoAcidente): IndicadorRiscoAcidente {        
        let cloneIndicadorRiscoAcidente = new IndicadorRiscoAcidente();
        
        if (indicadorRiscoAcidente === null || indicadorRiscoAcidente === undefined)
            indicadorRiscoAcidente = new IndicadorRiscoAcidente();
        
        cloneIndicadorRiscoAcidente.setId(this.getValue(indicadorRiscoAcidente, "getId"));
        cloneIndicadorRiscoAcidente.setVersion(this.getValue(indicadorRiscoAcidente, "getVersion"));
        cloneIndicadorRiscoAcidente.setNome(this.getValue(indicadorRiscoAcidente, "getNome"));
        cloneIndicadorRiscoAcidente.setCritico(this.getValue(indicadorRiscoAcidente, "getCritico"));
        cloneIndicadorRiscoAcidente.setIndice0(this.getValue(indicadorRiscoAcidente, "getIndice0"));
        cloneIndicadorRiscoAcidente.setIndice1(this.getValue(indicadorRiscoAcidente, "getIndice1"));
        cloneIndicadorRiscoAcidente.setIndice2(this.getValue(indicadorRiscoAcidente, "getIndice2"));
        cloneIndicadorRiscoAcidente.setIndice3(this.getValue(indicadorRiscoAcidente, "getIndice3"));
        cloneIndicadorRiscoAcidente.setIndice4(this.getValue(indicadorRiscoAcidente, "getIndice4"));
        cloneIndicadorRiscoAcidente.setIndice5(this.getValue(indicadorRiscoAcidente, "getIndice5"));
        
        let requisito:string = this.getValue(indicadorRiscoAcidente, "getRequisito");
        if(requisito == "")
            requisito = undefined;
        cloneIndicadorRiscoAcidente.setRequisito(requisito);
        
        if (this.getValue(indicadorRiscoAcidente, "getPeriodicidade") !== undefined) { 
            cloneIndicadorRiscoAcidente.setPeriodicidade(
                    new PeriodicidadeBuilder().clone(this.getValue(indicadorRiscoAcidente,"getPeriodicidade")));
            if(!this.idGtZero(cloneIndicadorRiscoAcidente.getPeriodicidade()))
                cloneIndicadorRiscoAcidente.setPeriodicidade(undefined);
        } else {
            cloneIndicadorRiscoAcidente.setPeriodicidade(new PeriodicidadeBuilder().initialize(null));
        }
                
        return cloneIndicadorRiscoAcidente;
    } 
    
}