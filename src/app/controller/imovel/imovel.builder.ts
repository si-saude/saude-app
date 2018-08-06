import { Imovel } from '../../model/imovel';
import { GenericBuilder } from '../../generics/generic.builder';
import { BaseBuilder } from './../base/base.builder';

export class ImovelBuilder extends GenericBuilder {

    initialize(imovel: Imovel) {
        imovel = new Imovel();
        
        imovel.setBase(new BaseBuilder().initialize(imovel.getBase()));
        
        return imovel;
    }
    
    initializeList(imoveis: Array<Imovel>) {
        
        let array:Array<Imovel> = new Array<Imovel>();
        
        if(imoveis === null || imoveis === undefined)
            imoveis = new Array<Imovel>();
        
        for (let imovel of imoveis) {
            array.push(this.initialize(imovel));
        }
        
        return array;
    }
    
    clone(imovel: Imovel): Imovel {
        
        if (imovel === null || imovel === undefined)
            imovel = new Imovel();
        
        let cloneImovel = new Imovel();
        cloneImovel.setId(this.getValue(imovel,"getId"));
        cloneImovel.setNome(this.getValue(imovel, "getNome"));
        cloneImovel.setVersion(this.getValue(imovel, "getVersion"));
        
        if (this.getValue(imovel, "getBase") !== undefined) { 
            cloneImovel.setBase(
                    new BaseBuilder().clone(this.getValue(imovel,"getBase")));
            if(!this.idGtZero(cloneImovel.getBase()))
                cloneImovel.setBase(undefined);
        } else {
            cloneImovel.setBase(new BaseBuilder().initialize(null));
        }
        
        return cloneImovel;
    }
    
    cloneList(imoveis: Array<Imovel>): Array<Imovel> {
        let array:Array<Imovel> = new Array<Imovel>();
    
        if (imoveis !== null && imoveis !== undefined) { 
            for (let imovel of imoveis) {
                array.push(this.clone(imovel));
            }
        }
        
        return array;
    }
    
}