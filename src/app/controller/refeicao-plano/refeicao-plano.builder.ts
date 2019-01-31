import { RefeicaoPlano } from './../../model/refeicao-plano';
import { PlanoAlimentarBuilder } from './../plano-alimentar/plano-alimentar.builder';
import { ItemRefeicaoPlanoBuilder } from './../item-refeicao-plano/item-refeicao-plano.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class RefeicaoPlanoBuilder extends GenericBuilder{
    
    initialize(refeicao: RefeicaoPlano): RefeicaoPlano {
        refeicao = new RefeicaoPlano();
        
        refeicao.setPlanoAlimentar(new PlanoAlimentarBuilder().initialize(null));
        refeicao.setItens(new ItemRefeicaoPlanoBuilder().initializeList(null));
        
        return refeicao;
    }
    
    initializeList(refeicoes: Array<RefeicaoPlano>) {
        
        let array:Array<RefeicaoPlano> = new Array<RefeicaoPlano>();
        
        if(refeicoes === null || refeicoes === undefined)
            refeicoes = new Array<RefeicaoPlano>();
        
        for (let refeicao of refeicoes) {
            array.push(this.initialize(refeicao));
        }
        
        return array;
    }
    
    clone(refeicao: RefeicaoPlano): RefeicaoPlano {
        let cloneRefeicao = new RefeicaoPlano();
        
        if (refeicao === null || refeicao === undefined)
            refeicao = new RefeicaoPlano();
        
        cloneRefeicao.setId(this.getValue(refeicao, "getId"));
        cloneRefeicao.setVersion(this.getValue(refeicao, "getVersion"));
        cloneRefeicao.setNome(this.getValue(refeicao, "getNome"));
        
        if ( this.getValue(refeicao, "getItens") != undefined )
            cloneRefeicao.setItens(
                    new ItemRefeicaoPlanoBuilder().cloneList(this.getValue(refeicao, "getItens")));
        
        if ( this.getValue(refeicao, "getPlanoAlimentar") != undefined )
            cloneRefeicao.setPlanoAlimentar(
                    new PlanoAlimentarBuilder().clone(this.getValue(refeicao, "getPlanoAlimentar")));
        
        return cloneRefeicao;
    }
    
    cloneList(refeicoes: Array<RefeicaoPlano>){
        
        if(refeicoes === null || refeicoes === undefined)
            refeicoes = new Array<RefeicaoPlano>();
        
        let array:Array<RefeicaoPlano> = new Array<RefeicaoPlano>();
    
        for (let refeicao of refeicoes) {
            array.push(this.clone(refeicao));
        }
    
        return array;
    }
    
}
