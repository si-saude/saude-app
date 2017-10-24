import { IndicadorRiscoSanitario } from './../../model/indicador-risco-sanitario';
import { Periodicidade } from './../../model/periodicidade';
import { PeriodicidadeBuilder } from './../periodicidade/periodicidade.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorRiscoSanitarioBuilder extends GenericBuilder{
    
    initialize(indicadorRiscoSanitario: IndicadorRiscoSanitario): IndicadorRiscoSanitario {
        indicadorRiscoSanitario = new IndicadorRiscoSanitario();
        
        indicadorRiscoSanitario.setPeriodicidade(new PeriodicidadeBuilder().initialize(indicadorRiscoSanitario.getPeriodicidade()));
        
        return indicadorRiscoSanitario;
    }
    
    clone(indicadorRiscoSanitario: IndicadorRiscoSanitario): IndicadorRiscoSanitario {        
        let cloneIndicadorRiscoSanitario = new IndicadorRiscoSanitario();
        
        if (indicadorRiscoSanitario === null || indicadorRiscoSanitario === undefined)
            indicadorRiscoSanitario = new IndicadorRiscoSanitario();
        
        cloneIndicadorRiscoSanitario.setId(this.getValue(indicadorRiscoSanitario, "getId"));
        cloneIndicadorRiscoSanitario.setVersion(this.getValue(indicadorRiscoSanitario, "getVersion"));
        cloneIndicadorRiscoSanitario.setNome(this.getValue(indicadorRiscoSanitario, "getNome"));
        cloneIndicadorRiscoSanitario.setCritico(this.getValue(indicadorRiscoSanitario, "getCritico"));
        cloneIndicadorRiscoSanitario.setIndice0(this.getValue(indicadorRiscoSanitario, "getIndice0"));
        cloneIndicadorRiscoSanitario.setIndice1(this.getValue(indicadorRiscoSanitario, "getIndice1"));
        cloneIndicadorRiscoSanitario.setIndice2(this.getValue(indicadorRiscoSanitario, "getIndice2"));
        cloneIndicadorRiscoSanitario.setIndice3(this.getValue(indicadorRiscoSanitario, "getIndice3"));
        cloneIndicadorRiscoSanitario.setIndice4(this.getValue(indicadorRiscoSanitario, "getIndice4"));
        cloneIndicadorRiscoSanitario.setIndice5(this.getValue(indicadorRiscoSanitario, "getIndice5"));
        
        let requisito:string = this.getValue(indicadorRiscoSanitario, "getRequisito");
        if(requisito == "")
            requisito = undefined;
        cloneIndicadorRiscoSanitario.setRequisito(requisito);
        
        if (this.getValue(indicadorRiscoSanitario, "getPeriodicidade") !== undefined) { 
            cloneIndicadorRiscoSanitario.setPeriodicidade(
                    new PeriodicidadeBuilder().clone(this.getValue(indicadorRiscoSanitario,"getPeriodicidade")));
            if(!this.idGtZero(cloneIndicadorRiscoSanitario.getPeriodicidade()))
                cloneIndicadorRiscoSanitario.setPeriodicidade(undefined);
        } else {
            cloneIndicadorRiscoSanitario.setPeriodicidade(new PeriodicidadeBuilder().initialize(null));
        }
                
        return cloneIndicadorRiscoSanitario;
    } 
    
}