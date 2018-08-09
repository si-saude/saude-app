import { Funcao } from './../../model/funcao';
import { GenericBuilder } from './../../generics/generic.builder';
import { Vacina } from './../../model/vacina';
import { VacinaBuilder } from './../vacina/vacina.builder';

export class FuncaoBuilder extends GenericBuilder {

    initialize(funcao: Funcao) {
        funcao = new Funcao();

        funcao.setVacinas(new VacinaBuilder().initializeList(funcao.getVacinas()));
        return funcao;
    }
    
    clone(funcao: Funcao): Funcao {
        
        if (funcao === null || funcao === undefined)
            funcao = new Funcao();
        
        let cloneFuncao = new Funcao();
        cloneFuncao.setId(this.getValue(funcao,"getId"));
        cloneFuncao.setNome(this.getValue(funcao, "getNome"));
        cloneFuncao.setVersion(this.getValue(funcao, "getVersion"));
        cloneFuncao.setVacinas(new VacinaBuilder().cloneList(this.getValue(funcao,"getVacinas")));
        
        return cloneFuncao;
    }
    
    cloneList(funcoes: Array<Funcao>): Array<Funcao> {
        let array:Array<Funcao> = new Array<Funcao>();
        if (funcoes !== null && funcoes !== undefined) { 
            for (let funcao of funcoes) {
                array.push(this.clone(funcao));
            }
        }
        
        return array;
    }
    
}