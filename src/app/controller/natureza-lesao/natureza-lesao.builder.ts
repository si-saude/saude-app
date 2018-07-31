import { NaturezaLesao } from '../../model/natureza-lesao';
import { GenericBuilder } from '../../generics/generic.builder';

export class NaturezaLesaoBuilder extends GenericBuilder {

    initialize(naturezaLesao: NaturezaLesao) {
        naturezaLesao = new NaturezaLesao();
        return naturezaLesao;
    }
    
    initializeList(naturezaLesoes: Array<NaturezaLesao>) {
        
        let array:Array<NaturezaLesao> = new Array<NaturezaLesao>();
        
        if(naturezaLesoes === null || naturezaLesoes === undefined)
            naturezaLesoes = new Array<NaturezaLesao>();
        
        for (let naturezaLesao of naturezaLesoes) {
            array.push(this.initialize(naturezaLesao));
        }
        
        return array;
    }
    
    clone(naturezaLesao: NaturezaLesao): NaturezaLesao {
        
        if (naturezaLesao === null || naturezaLesao === undefined)
            naturezaLesao = new NaturezaLesao();
        
        let cloneNaturezaLesao = new NaturezaLesao();
        cloneNaturezaLesao.setId(this.getValue(naturezaLesao,"getId"));
        cloneNaturezaLesao.setCodigo(this.getValue(naturezaLesao, "getCodigo"));
        cloneNaturezaLesao.setDescricao(this.getValue(naturezaLesao, "getDescricao"));
        cloneNaturezaLesao.setVersion(this.getValue(naturezaLesao, "getVersion"));
        return cloneNaturezaLesao;
    }
    
    cloneList(naturezaLesoes: Array<NaturezaLesao>): Array<NaturezaLesao> {
        let array:Array<NaturezaLesao> = new Array<NaturezaLesao>();
    
        if (naturezaLesoes !== null && naturezaLesoes !== undefined) { 
            for (let naturezaLesao of naturezaLesoes) {
                array.push(this.clone(naturezaLesao));
            }
        }
        
        return array;
    }
}