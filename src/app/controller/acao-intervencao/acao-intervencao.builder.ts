import { AcaoIntervencao } from '../../model/acao-intervencao';
import { GenericBuilder } from '../../generics/generic.builder';
import { EquipeBuilder } from './../equipe/equipe.builder';

export class AcaoIntervencaoBuilder extends GenericBuilder {

    initialize(acaoIntervencao: AcaoIntervencao) {
        acaoIntervencao = new AcaoIntervencao();
        acaoIntervencao.setEquipe(new EquipeBuilder().initialize(acaoIntervencao.getEquipe()));
        return acaoIntervencao;
    }
    
    initializeList(acaoIntervencoes: Array<AcaoIntervencao>) {
        
        let array:Array<AcaoIntervencao> = new Array<AcaoIntervencao>();
        
        if(acaoIntervencoes === null || acaoIntervencoes === undefined)
            acaoIntervencoes = new Array<AcaoIntervencao>();
        
        for (let acaoIntervencao of acaoIntervencoes) {
            array.push(this.initialize(acaoIntervencao));
        }
        
        return array;
    }
    
    clone(acaoIntervencao: AcaoIntervencao): AcaoIntervencao {
        
        if (acaoIntervencao === null || acaoIntervencao === undefined)
            acaoIntervencao = new AcaoIntervencao();
        
        let cloneAcaoIntervencao = new AcaoIntervencao();
        cloneAcaoIntervencao.setId(this.getValue(acaoIntervencao,"getId"));
        cloneAcaoIntervencao.setDescricao(this.getValue(acaoIntervencao, "getDescricao"));
        cloneAcaoIntervencao.setVersion(this.getValue(acaoIntervencao, "getVersion"));
        
        if (this.getValue(acaoIntervencao, "getEquipe") !== undefined) { 
            cloneAcaoIntervencao.setEquipe(new EquipeBuilder().clone(this.getValue( acaoIntervencao, "getEquipe" )));
            if(!this.idGtZero(cloneAcaoIntervencao.getEquipe()))
                cloneAcaoIntervencao.setEquipe(undefined);
        } else cloneAcaoIntervencao.setEquipe(new EquipeBuilder().initialize(null));
        
        
        return cloneAcaoIntervencao;
    }
    
    cloneList(acaoIntervencoes: Array<AcaoIntervencao>): Array<AcaoIntervencao> {
        let array:Array<AcaoIntervencao> = new Array<AcaoIntervencao>();
        if (acaoIntervencoes !== null && acaoIntervencoes !== undefined) { 
            for (let acaoIntervencao of acaoIntervencoes) {
                array.push(this.clone(acaoIntervencao));
            }
        }
        
        return array;
    }
    
}