import { Empresa } from '../../model/empresa';
import { CidadeBuilder } from './../cidade/cidade.builder';
import { CnaeBuilder } from './../cnae/cnae.builder';
import { GenericBuilder } from '../../generics/generic.builder';

export class EmpresaBuilder extends GenericBuilder {

    initialize(empresa: Empresa) {
        empresa = new Empresa();
        
        empresa.setMunicipio(new CidadeBuilder().initialize(null));
        empresa.setCnaes(new CnaeBuilder().initializeList(null));
        
        return empresa;
    }
    
    initializeList(empresas: Array<Empresa>) {
        
        let array:Array<Empresa> = new Array<Empresa>();
        
        if(empresas === null || empresas === undefined)
            empresas = new Array<Empresa>();
        
        for (let empresa of empresas) {
            array.push(this.initialize(empresa));
        }
        
        return array;
    }
    
    clone(empresa: Empresa): Empresa {
        
        if (empresa === null || empresa === undefined)
            empresa = new Empresa();
        
        let cloneEmpresa = new Empresa();
        cloneEmpresa.setId(this.getValue(empresa,"getId"));
        cloneEmpresa.setNome(this.getValue(empresa, "getNome"));
        cloneEmpresa.setCnpj(this.treatMask(this.getValue(empresa, "getCnpj")));
        cloneEmpresa.setCep(this.treatMask(this.getValue(empresa, "getCep")));
        cloneEmpresa.setEndereco(this.getValue(empresa, "getEndereco"));
        cloneEmpresa.setTelefone(this.treatMask(this.getValue(empresa, "getTelefone")));
        cloneEmpresa.setBairro(this.getValue(empresa, "getBairro"));
        cloneEmpresa.setVersion(this.getValue(empresa, "getVersion"));
        
        cloneEmpresa.setCnaes(new CnaeBuilder().cloneList(this.getValue(empresa,"getCnaes")));
        
        if (this.getValue(empresa, "getMunicipio") !== undefined) { 
            cloneEmpresa.setMunicipio(
                    new CidadeBuilder().clone(this.getValue(empresa,"getMunicipio")));
            if(!this.idGtZero(cloneEmpresa.getMunicipio()))
                cloneEmpresa.setMunicipio(undefined);
        } else {
            cloneEmpresa.setMunicipio(new CidadeBuilder().initialize(null));
        }
        
        return cloneEmpresa;
    }
    
    cloneList(empresas: Array<Empresa>): Array<Empresa> {
        let array:Array<Empresa> = new Array<Empresa>();
        if (empresas !== null && empresas !== undefined) { 
            for (let empresa of empresas) {
                array.push(this.clone(empresa));
            }
        }
        
        return array;
    }
    
    treatMask( value: string ) {
        if ( value != undefined )
            return value.replace(/\.|\/|-| |\(|\)/gi, "");
    }
    
}