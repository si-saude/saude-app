import { Fornecedor } from './../../model/fornecedor';
import { Endereco } from './../../model/endereco';
import { EnderecoBuilder } from './../endereco/endereco.builder';
import { Telefone } from './../../model/telefone';
import { TelefoneBuilder } from './../telefone/telefone.builder';

export class FornecedorBuilder {
    
    initialize(fornecedor: Fornecedor) {
        fornecedor = new Fornecedor();
        fornecedor.setEndereco(new EnderecoBuilder().initialize(new Endereco()));
        fornecedor.setTelefones(new TelefoneBuilder().initializeList(new Array<Telefone>()));
    }
    
    initializeList(fornecedores: Array<Fornecedor>) {
        for (let fornecedor of fornecedores) {
            this.initialize(fornecedor);
        }
    }
    
    clone(fornecedor: Fornecedor): Fornecedor {
        let cloneFornecedor = new Fornecedor();
        cloneFornecedor.setId(fornecedor.getId());
        cloneFornecedor.setVersion(fornecedor.getVersion());
        cloneFornecedor.setCodigoSap(fornecedor.getCodigoSap());
        cloneFornecedor.setCpfCnpj(fornecedor.getCpfCnpj());
        cloneFornecedor.setEmail(fornecedor.getEmail());
        cloneFornecedor.setEndereco(fornecedor.getEndereco());
        cloneFornecedor.setRazaoSocial(fornecedor.getRazaoSocial());
        cloneFornecedor.setTelefones(fornecedor.getTelefones());
        cloneFornecedor.setTipoPessoa(fornecedor.getTipoPessoa());
        
        return cloneFornecedor;
    }
    
}