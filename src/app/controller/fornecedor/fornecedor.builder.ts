import { Fornecedor } from './../../model/fornecedor';
import { Endereco } from './../../model/endereco';
import { EnderecoBuilder } from './../endereco/endereco.builder';
import { Telefone } from './../../model/telefone';
import { TelefoneBuilder } from './../telefone/telefone.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class FornecedorBuilder extends GenericBuilder{
    
    initialize(fornecedor: Fornecedor) {
        fornecedor = new Fornecedor();
        fornecedor.setEndereco(new EnderecoBuilder().initialize(new Endereco()));
        fornecedor.setTelefones(new TelefoneBuilder().initializeList(new Array<Telefone>()));
        
        return fornecedor;
    }
    
    initializeList(fornecedores: Array<Fornecedor>) {
        let array:Array<Fornecedor> = new Array<Fornecedor>();
    
        if(fornecedores === null || fornecedores === undefined)
            fornecedores = new Array<Fornecedor>();
        
        for (let fornecedor of fornecedores) {
            array.push(this.initialize(fornecedor));
        }
        
        return array;
    }
    
    clone(fornecedor: Fornecedor): Fornecedor {
        let cloneFornecedor = new Fornecedor();
        cloneFornecedor.setId(this.getValue(fornecedor, "getId"));
        cloneFornecedor.setVersion(this.getValue(fornecedor, "getVersion"));
        cloneFornecedor.setCodigoSap(this.getValue(fornecedor, "getCodigoSap"));
        cloneFornecedor.setCpfCnpj(this.getValue(fornecedor, "getCpfCnpj"));
        cloneFornecedor.setEmail(this.getValue(fornecedor, "getEmail"));
        cloneFornecedor.setRazaoSocial(this.getValue(fornecedor, "getRazaoSocial"));
        
        if(this.getValue(fornecedor, "getTipoPessoa") == "")
            cloneFornecedor.setTipoPessoa(undefined);
        else if(this.getValue(fornecedor, "getTipoPessoa") == undefined)
            cloneFornecedor.setTipoPessoa("");
        else cloneFornecedor.setTipoPessoa(this.getValue(fornecedor, "getTipoPessoa"));
        
        if(this.getValue(fornecedor, "getEndereco") !== undefined) {
            if(Object.keys(this.getValue(fornecedor, "getEndereco")).length === 2 && 
                    fornecedor.getEndereco().getCidade().getId() === 0) 
                cloneFornecedor.setEndereco(undefined);
            else
                cloneFornecedor.setEndereco(
                        new EnderecoBuilder().clone(this.getValue(fornecedor, "getEndereco")));
        } else {
            cloneFornecedor.setEndereco(new EnderecoBuilder().initialize(null));
        }
        
        cloneFornecedor.setTelefones(
                new TelefoneBuilder().cloneList(this.getValue(fornecedor, "getTelefones")));
        
        return cloneFornecedor;
    }
    
    cloneList(fornecedores: Array<Fornecedor>): Array<Fornecedor> {
        let array:Array<Fornecedor> = new Array<Fornecedor>();
    
        if (fornecedores !== null && fornecedores !== undefined) { 
            for (let fornecedor of fornecedores) {
                array.push(this.clone(fornecedor));
            }
        }
        
        return array;
    }
}