import { Aprho } from './../../model/aprho';
import { GenericBuilder } from './../../generics/generic.builder';
import { GheBuilder } from './../ghe/ghe.builder';

export class AprhoBuilder extends GenericBuilder {

    initialize(aprho: Aprho) {
        aprho = new Aprho();
        return aprho;
    }
    
    clone(aprho: Aprho): Aprho {
        
        if (aprho === null || aprho === undefined)
            aprho = new Aprho();
        
        let cloneAprho = new Aprho();
        cloneAprho.setId(this.getValue(aprho,"getId"));
        cloneAprho.setEmpresa(this.getValue(aprho, "getEmpresa"));
        cloneAprho.setData(this.getValue(aprho, "getData"));
        cloneAprho.setVersion(this.getValue(aprho, "getVersion"));
        
        if (this.getValue(aprho, "getGhe") !== undefined) { 
            cloneAprho.setGhe(
                    new GheBuilder().clone(this.getValue(aprho,"getGhe")));
        } else {
            cloneAprho.setGhe(new GheBuilder().initialize(null));
        }
        
        
        return cloneAprho;
    }
    
}