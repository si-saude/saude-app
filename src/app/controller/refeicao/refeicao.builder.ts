import { Refeicao } from './../../model/refeicao';
import { RecordatorioBuilder } from './../recordatorio/recordatorio.builder';
import { ItemRefeicaoBuilder } from './../item-refeicao/item-refeicao.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class RefeicaoBuilder extends GenericBuilder{
    
    initialize(refeicao: Refeicao): Refeicao {
        refeicao = new Refeicao();
        
        refeicao.setRecordatorio(new RecordatorioBuilder().initialize(null));
        refeicao.setItens(new ItemRefeicaoBuilder().initializeList(null));
        
        return refeicao;
    }
    
    initializeList(refeicoes: Array<Refeicao>) {
        
        let array:Array<Refeicao> = new Array<Refeicao>();
        
        if(refeicoes === null || refeicoes === undefined)
            refeicoes = new Array<Refeicao>();
        
        for (let refeicao of refeicoes) {
            array.push(this.initialize(refeicao));
        }
        
        return array;
    }
    
    clone(refeicao: Refeicao): Refeicao {
        let cloneRefeicao = new Refeicao();
        
        if (refeicao === null || refeicao === undefined)
            refeicao = new Refeicao();
        
        cloneRefeicao.setId(this.getValue(refeicao, "getId"));
        cloneRefeicao.setVersion(this.getValue(refeicao, "getVersion"));
        cloneRefeicao.setNome(this.getValue(refeicao, "getNome"));
        
        if ( this.getValue(refeicao, "getItens") != undefined )
            cloneRefeicao.setItens(
                    new ItemRefeicaoBuilder().cloneList(this.getValue(refeicao, "getItens")));
        
        if ( this.getValue(refeicao, "getRecordatorio") != undefined )
            cloneRefeicao.setRecordatorio(
                    new RecordatorioBuilder().clone(this.getValue(refeicao, "getRecordatorio")));
        
        return cloneRefeicao;
    }
    
    cloneList(refeicoes: Array<Refeicao>){
        
        if(refeicoes === null || refeicoes === undefined)
            refeicoes = new Array<Refeicao>();
        
        let array:Array<Refeicao> = new Array<Refeicao>();
    
        for (let refeicao of refeicoes) {
            array.push(this.clone(refeicao));
        }
    
        return array;
    }
    
}
