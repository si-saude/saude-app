import { Funcao } from './../../model/funcao';
import { GenericBuilder } from './../../generics/generic.builder';

export class FuncaoBuilder extends GenericBuilder {

    initialize(funcao: Funcao) {
        funcao = new Funcao();
        return funcao;
    }
    
    clone(funcao: Funcao): Funcao {
        
        if (funcao === null || funcao === undefined)
            funcao = new Funcao();
        
        let cloneFuncao = new Funcao();
        cloneFuncao.setId(this.getValue(funcao,"getId"));
        cloneFuncao.setNome(this.getValue(funcao, "getNome"));
        cloneFuncao.setVersion(this.getValue(funcao, "getVersion"));
        return cloneFuncao;
    }
    
}