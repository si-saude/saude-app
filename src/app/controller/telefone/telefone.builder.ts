import { Telefone } from './../../model/telefone';
import { GenericBuilder } from './../../generics/generic.builder';

export class TelefoneBuilder extends GenericBuilder {
    
    initialize(telefone: Telefone) {
        telefone = new Telefone();
        return telefone;
    }
    
    initializeList(telefones: Array<Telefone>) {
        
        let array:Array<Telefone> = new Array<Telefone>();
        
        if(telefones === null || telefones === undefined)
            telefones = new Array<Telefone>();
        
        for (let telefone of telefones) {
            array.push(this.initialize(telefone));
        }
        
        return array;
    }
    
    clone(telefone: Telefone): Telefone {
        
        if (telefone === null || telefone === undefined)
            telefone = new Telefone();
        
        let cloneTelefone = new Telefone();
        cloneTelefone.setId(this.getValue(telefone,"getId"));
        cloneTelefone.setVersion(this.getValue(telefone,"getVersion"));
        cloneTelefone.setNumero(this.getValue(telefone,"getNumero"));
        
        return cloneTelefone;
    }
    
    cloneList(telefones: Array<Telefone>):Array<Telefone>{
        let array:Array<Telefone> = new Array<Telefone>();
    
        if (telefones !== null && telefones !== undefined) {
            for (let telefone of telefones) {
                array.push(this.clone(telefone));
            }
        }
    
        return array;
    }
    
}