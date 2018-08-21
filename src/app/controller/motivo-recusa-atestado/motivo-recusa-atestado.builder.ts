import { MotivoRecusaAtestado } from '../../model/motivo-recusa-atestado';
import { GenericBuilder } from '../../generics/generic.builder';

export class MotivoRecusaAtestadoBuilder extends GenericBuilder {

    initialize(motivoRecusaAtestado: MotivoRecusaAtestado) {
        motivoRecusaAtestado = new MotivoRecusaAtestado();
        return motivoRecusaAtestado;
    }
    
    initializeList(motivoRecusaAtestados: Array<MotivoRecusaAtestado>) {
        
        let array:Array<MotivoRecusaAtestado> = new Array<MotivoRecusaAtestado>();
        
        if(motivoRecusaAtestados === null || motivoRecusaAtestados === undefined)
            motivoRecusaAtestados = new Array<MotivoRecusaAtestado>();
        
        for (let motivoRecusaAtestado of motivoRecusaAtestados) {
            array.push(this.initialize(motivoRecusaAtestado));
        }
        
        return array;
    }
    
    clone(motivoRecusaAtestado: MotivoRecusaAtestado): MotivoRecusaAtestado {
        
        if (motivoRecusaAtestado === null || motivoRecusaAtestado === undefined)
            motivoRecusaAtestado = new MotivoRecusaAtestado();
        
        let cloneMotivoRecusaAtestado = new MotivoRecusaAtestado();
        cloneMotivoRecusaAtestado.setId(this.getValue(motivoRecusaAtestado,"getId"));
        cloneMotivoRecusaAtestado.setDescricao(this.getValue(motivoRecusaAtestado, "getDescricao"));
        cloneMotivoRecusaAtestado.setPermiteReabertura(this.getValue(motivoRecusaAtestado, "getPermiteReabertura"));
        cloneMotivoRecusaAtestado.setVersion(this.getValue(motivoRecusaAtestado, "getVersion"));
        return cloneMotivoRecusaAtestado;
    }
    
    cloneList(motivoRecusaAtestados: Array<MotivoRecusaAtestado>): Array<MotivoRecusaAtestado> {
        let array:Array<MotivoRecusaAtestado> = new Array<MotivoRecusaAtestado>();
        if (motivoRecusaAtestados !== null && motivoRecusaAtestados !== undefined) { 
            for (let motivoRecusaAtestado of motivoRecusaAtestados) {
                array.push(this.clone(motivoRecusaAtestado));
            }
        }
        
        return array;
    }
    
}