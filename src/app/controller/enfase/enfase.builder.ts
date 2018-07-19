import { Enfase } from './../../model/enfase';
import { GenericBuilder } from './../../generics/generic.builder';

export class EnfaseBuilder extends GenericBuilder {

    initialize(enfase: Enfase) {
        enfase = new Enfase();
        return enfase;
    }
    
    initializeList(enfases: Array<Enfase>) {
        
        let array:Array<Enfase> = new Array<Enfase>();
        
        if(enfases === null || enfases === undefined)
            enfases = new Array<Enfase>();
        
        for (let enfase of enfases) {
            array.push(this.initialize(enfase));
        }
        
        return array;
    }
    
    clone(enfase: Enfase): Enfase {
        
        if (enfase === null || enfase === undefined)
            enfase = new Enfase();
        
        let cloneEnfase = new Enfase();
        cloneEnfase.setId(this.getValue(enfase,"getId"));
        cloneEnfase.setDescricao(this.getValue(enfase, "getDescricao"));
        cloneEnfase.setVersion(this.getValue(enfase, "getVersion"));
        return cloneEnfase;
    }
    
    cloneList(enfases: Array<Enfase>): Array<Enfase> {
        let array:Array<Enfase> = new Array<Enfase>();
    
        if (enfases !== null && enfases !== undefined) { 
            for (let enfase of enfases) {
                array.push(this.clone(enfase));
            }
        }
        
        return array;
    }
    
}