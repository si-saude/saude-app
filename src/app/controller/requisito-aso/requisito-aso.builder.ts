import { RequisitoAso } from './../../model/requisito-aso';
import { GenericBuilder } from './../../generics/generic.builder';

export class RequisitoAsoBuilder extends GenericBuilder {
    
    initialize(requisito:RequisitoAso){
        requisito = new RequisitoAso();
        return requisito;
    }
    
    clone(requisito:RequisitoAso): RequisitoAso {
        if(requisito === null || requisito === undefined)
            requisito = new RequisitoAso();
        
        let cloneRequisito = new RequisitoAso();
        cloneRequisito.setId(this.getValue(requisito, "getId"));
        cloneRequisito.setConteudo(this.getValue(requisito, "getConteudo"));
        cloneRequisito.setVersion(this.getValue(requisito, "getVersion"));
        return cloneRequisito;
    }
}