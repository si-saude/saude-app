import { ClassificacaoGravidade } from './../../model/classificacao-gravidade';
import { GenericBuilder } from './../../generics/generic.builder';

export class ClassificacaoGravidadeBuilder extends GenericBuilder {

    initialize(classificacaoGravidade: ClassificacaoGravidade) {
        classificacaoGravidade = new ClassificacaoGravidade();
        return classificacaoGravidade;
    }
    
    initializeList(classificacaoGravidades: Array<ClassificacaoGravidade>) {
        
        let array:Array<ClassificacaoGravidade> = new Array<ClassificacaoGravidade>();
        
        if(classificacaoGravidades === null || classificacaoGravidades === undefined)
            classificacaoGravidades = new Array<ClassificacaoGravidade>();
        
        for (let classificacaoGravidade of classificacaoGravidades) {
            array.push(this.initialize(classificacaoGravidade));
        }
        
        return array;
    }
    
    clone(classificacaoGravidade: ClassificacaoGravidade): ClassificacaoGravidade {
        
        if (classificacaoGravidade === null || classificacaoGravidade === undefined)
            classificacaoGravidade = new ClassificacaoGravidade();
        
        let cloneClassificacaoGravidade = new ClassificacaoGravidade();
        cloneClassificacaoGravidade.setId(this.getValue(classificacaoGravidade,"getId"));
        cloneClassificacaoGravidade.setTitulo(this.getValue(classificacaoGravidade, "getTitulo"));
        cloneClassificacaoGravidade.setVersion(this.getValue(classificacaoGravidade, "getVersion"));
        return cloneClassificacaoGravidade;
    }
    
    cloneList(classificacaoGravidades: Array<ClassificacaoGravidade>): Array<ClassificacaoGravidade> {
        let array:Array<ClassificacaoGravidade> = new Array<ClassificacaoGravidade>();
        if (classificacaoGravidades !== null && classificacaoGravidades !== undefined) { 
            for (let classificacaoGravidade of classificacaoGravidades) {
                array.push(this.clone(classificacaoGravidade));
            }
        }
        
        return array;
    }
    
}