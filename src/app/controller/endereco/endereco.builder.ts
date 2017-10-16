import { Endereco } from './../../model/endereco';
import { CidadeBuilder } from './../cidade/cidade.builder';
import { Cidade } from './../../model/cidade';
import { GenericBuilder } from './../../generics/generic.builder';

export class EnderecoBuilder extends GenericBuilder{
    
    initialize(endereco: Endereco) { 
        endereco = new Endereco();
        endereco.setCidade(new CidadeBuilder().initialize(endereco.getCidade()));
        return endereco; 
    }
    
    clone(endereco: Endereco): Endereco {
        
        if (endereco === null || endereco === undefined)
            endereco = new Endereco();
        
        let cloneEndereco: Endereco = new Endereco();
        
        cloneEndereco.setId(this.getValue(endereco,"getId"));
        cloneEndereco.setVersion(this.getValue(endereco,"getVersion"));
        cloneEndereco.setLogradouro(this.getValue(endereco,"getLogradouro"));
        cloneEndereco.setNumero(this.getValue(endereco,"getNumero"));
        cloneEndereco.setComplemento(this.getValue(endereco,"getComplemento"));
        cloneEndereco.setBairro(this.getValue(endereco,"getBairro"));
        cloneEndereco.setCep(this.getValue(endereco,"getCep"));
        cloneEndereco.setCidade(new CidadeBuilder().clone(this.getValue(endereco,"getCidade")));
    
        return cloneEndereco;
    }
    
}