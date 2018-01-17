import { RegraAtendimento } from './../../model/regra-atendimento';
import { RegraAtendimentoEquipe } from './../../model/regra-atendimento-equipe';
import { RegraAtendimentoEquipeBuilder } from './../regra-atendimento-equipe/regra-atendimento-equipe.builder';
import { GenericBuilder } from './../../generics/generic.builder';
 
export class RegraAtendimentoBuilder extends GenericBuilder {
    
    initialize(regraAtendimento: RegraAtendimento) {
        regraAtendimento = new RegraAtendimento();
        
        regraAtendimento.setRegraAtendimentoEquipes(
                new RegraAtendimentoEquipeBuilder().initializeList(new Array<RegraAtendimentoEquipe>()));
        
        return regraAtendimento;
    }
    
    initializeList(regraAtendimentos: Array<RegraAtendimento>) {
        
        let array:Array<RegraAtendimento> = new Array<RegraAtendimento>();
        
        if(regraAtendimentos === null || regraAtendimentos === undefined)
            regraAtendimentos = new Array<RegraAtendimento>();
        
        for (let regraAtendimento of regraAtendimentos) {
            array.push(this.initialize(regraAtendimento));
        }
        
        return array;
    }
    
    clone(regraAtendimento: RegraAtendimento): RegraAtendimento {
        
        if ( regraAtendimento === null || regraAtendimento === undefined )
            regraAtendimento = new RegraAtendimento();
        
        let cloneRegraAtendimento = new RegraAtendimento();
        cloneRegraAtendimento.setId(this.getValue(regraAtendimento,"getId"));
        cloneRegraAtendimento.setVersion(this.getValue(regraAtendimento,"getVersion"));
        cloneRegraAtendimento.setNome(this.getValue(regraAtendimento,"getNome"));
        
        cloneRegraAtendimento.setRegraAtendimentoEquipes(
                new RegraAtendimentoEquipeBuilder().cloneList(this.getValue(regraAtendimento,"getRegraAtendimentoEquipes")));
                
        return cloneRegraAtendimento;
    }
    
    cloneList(regraAtendimentos: Array<RegraAtendimento>): Array<RegraAtendimento> {
        let array: Array<RegraAtendimento> = new Array<RegraAtendimento>();
    
        if (regraAtendimentos !== null && regraAtendimentos !== undefined) { 
            for (let regraAtendimento of regraAtendimentos) {
                array.push(this.clone(regraAtendimento));
            }
        }
        
        return array;
    }
    
}