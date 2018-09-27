import { ClassificacaoAfastamento } from './../../model/classificacao-afastamento';
import { GenericBuilder } from './../../generics/generic.builder';

export class ClassificacaoAfastamentoBuilder extends GenericBuilder {

    initialize(classificacaoAfastamento: ClassificacaoAfastamento) {
        classificacaoAfastamento = new ClassificacaoAfastamento();
        return classificacaoAfastamento;
    }
    
    initializeList(classificacaoAfastamentos: Array<ClassificacaoAfastamento>) {
        
        let array:Array<ClassificacaoAfastamento> = new Array<ClassificacaoAfastamento>();
        
        if(classificacaoAfastamentos === null || classificacaoAfastamentos === undefined)
            classificacaoAfastamentos = new Array<ClassificacaoAfastamento>();
        
        for (let classificacaoAfastamento of classificacaoAfastamentos) {
            array.push(this.initialize(classificacaoAfastamento));
        }
        
        return array;
    }
    
    clone(classificacaoAfastamento: ClassificacaoAfastamento): ClassificacaoAfastamento {
        
        if (classificacaoAfastamento === null || classificacaoAfastamento === undefined)
            classificacaoAfastamento = new ClassificacaoAfastamento();
        
        let cloneClassificacaoAfastamento = new ClassificacaoAfastamento();
        cloneClassificacaoAfastamento.setId(this.getValue(classificacaoAfastamento,"getId"));
        cloneClassificacaoAfastamento.setDescricao(this.getValue(classificacaoAfastamento, "getDescricao"));
        cloneClassificacaoAfastamento.setGeraAfastamento(this.getValue(classificacaoAfastamento, "getGeraAfastamento"));
        cloneClassificacaoAfastamento.setVersion(this.getValue(classificacaoAfastamento, "getVersion"));
        return cloneClassificacaoAfastamento;
    }
    
    cloneList(classificacaoAfastamentos: Array<ClassificacaoAfastamento>): Array<ClassificacaoAfastamento> {
        let array:Array<ClassificacaoAfastamento> = new Array<ClassificacaoAfastamento>();
        if (classificacaoAfastamentos !== null && classificacaoAfastamentos !== undefined) { 
            for (let classificacaoAfastamento of classificacaoAfastamentos) {
                array.push(this.clone(classificacaoAfastamento));
            }
        }
        
        return array;
    }
    
}