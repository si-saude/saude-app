import { Feriado } from './../../model/feriado'; 
import { GenericBuilder } from './../../generics/generic.builder';

export class FeriadoBuilder extends GenericBuilder{
    
    initialize(feriado: Feriado): Feriado {
        feriado = new Feriado();
        
        return feriado;
    }
    
    initializeList(feriados: Array<Feriado>) {
        
        let array: Array<Feriado> = new Array<Feriado>();
        
        if(feriados === null || feriados === undefined)
            feriados = new Array<Feriado>();
        
        for (let feriado of feriados) {
            array.push(this.initialize(feriado));
        }
        
        return array;
    }
    
    clone(feriado: Feriado): Feriado {        
        let cloneFeriado = new Feriado();
        
        if (feriado === null || feriado === undefined)
            feriado = new Feriado();
        
        cloneFeriado.setId(this.getValue(feriado, "getId"));
        cloneFeriado.setVersion(this.getValue(feriado, "getVersion"));
        cloneFeriado.setTitulo(this.getValue(feriado, "getTitulo"));
        cloneFeriado.setData(this.getValue(feriado, "getData"));
                
        return cloneFeriado;
    } 
    
    cloneList(feriados: Array<Feriado>): Array<Feriado>{
        let array:Array<Feriado> = new Array<Feriado>();
    
        if (feriados !== null && feriados !== undefined) {
            for (let feriado of feriados) {
                array.push(this.clone(feriado));
            }
        }
    
        return array;
    }
    
}