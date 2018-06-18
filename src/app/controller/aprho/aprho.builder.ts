import { Aprho } from './../../model/aprho';
import { GenericBuilder } from './../../generics/generic.builder';
import { GheBuilder } from './../ghe/ghe.builder';
import { AprhoItemBuilder } from './../aprho-item/aprho-item.builder';
import { AprhoEmpregadoBuilder } from './../aprho-empregado/aprho-empregado.builder';

export class AprhoBuilder extends GenericBuilder {

    initialize(aprho: Aprho) {
        aprho = new Aprho();
        aprho.setGhe(new GheBuilder().initialize(aprho.getGhe()));
        aprho.setAprhoItens(new AprhoItemBuilder().initializeList(aprho.getAprhoItens()));
        aprho.setAprhoEmpregados(new AprhoEmpregadoBuilder().initializeList(aprho.getAprhoEmpregados()));
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
        cloneAprho.setAprhoItens(new AprhoItemBuilder().cloneList(this.getValue(aprho,"getAprhoItens")));
        cloneAprho.setAprhoEmpregados(new AprhoEmpregadoBuilder().cloneList(this.getValue(aprho,"getAprhoEmpregados")));
        
        
        if (this.getValue(aprho, "getGhe") !== undefined) { 
            cloneAprho.setGhe(
                    new GheBuilder().clone(this.getValue(aprho,"getGhe")));
        } else {
            cloneAprho.setGhe(new GheBuilder().initialize(null));
        }
        
        
        return cloneAprho;
    }
    
}