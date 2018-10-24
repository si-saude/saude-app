import { MedidaAlimentar } from '../../model/medida-alimentar';
import { GenericBuilder } from '../../generics/generic.builder';

export class MedidaAlimentarBuilder extends GenericBuilder {

    initialize(medidaAlimentar: MedidaAlimentar) {
        medidaAlimentar = new MedidaAlimentar();
        return medidaAlimentar;
    }
    
    initializeList(medidaAlimentars: Array<MedidaAlimentar>) {
        
        let array:Array<MedidaAlimentar> = new Array<MedidaAlimentar>();
        
        if(medidaAlimentars === null || medidaAlimentars === undefined)
            medidaAlimentars = new Array<MedidaAlimentar>();
        
        for (let medidaAlimentar of medidaAlimentars) {
            array.push(this.initialize(medidaAlimentar));
        }
        
        return array;
    }
    
    clone(medidaAlimentar: MedidaAlimentar): MedidaAlimentar {
        
        if (medidaAlimentar === null || medidaAlimentar === undefined)
            medidaAlimentar = new MedidaAlimentar();
        
        let cloneMedidaAlimentar = new MedidaAlimentar();
        cloneMedidaAlimentar.setId(this.getValue(medidaAlimentar,"getId"));
        cloneMedidaAlimentar.setDescricao(this.getValue(medidaAlimentar, "getDescricao"));
        cloneMedidaAlimentar.setVersion(this.getValue(medidaAlimentar, "getVersion"));
        return cloneMedidaAlimentar;
    }
    
    cloneList(medidaAlimentars: Array<MedidaAlimentar>): Array<MedidaAlimentar> {
        let array:Array<MedidaAlimentar> = new Array<MedidaAlimentar>();
        if (medidaAlimentars !== null && medidaAlimentars !== undefined) { 
            for (let medidaAlimentar of medidaAlimentars) {
                array.push(this.clone(medidaAlimentar));
            }
        }
        
        return array;
    }
    
}