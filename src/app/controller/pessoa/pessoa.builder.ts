import { Pessoa } from './../../model/pessoa';
import { TelefoneBuilder } from './../telefone/telefone.builder';
import { GenericBuilder } from './../../generics/generic.builder';
import { EnderecoBuilder } from './../endereco/endereco.builder';

export class PessoaBuilder extends GenericBuilder {
    
    initialize(pessoa: Pessoa) {
        pessoa = new Pessoa();
        
        pessoa.setTelefones(new TelefoneBuilder().initializeList(pessoa.getTelefones()));
        pessoa.setEndereco(new EnderecoBuilder().initialize(pessoa.getEndereco()));

        return pessoa;
    }
    
    initializeList(pessoas: Array<Pessoa>) {
        
        let array:Array<Pessoa> = new Array<Pessoa>();
        
        if(pessoas === null || pessoas === undefined)
            pessoas = new Array<Pessoa>();
        
        for (let pessoa of pessoas) {
            array.push(this.initialize(pessoa));
        }
        
        return array;
    }
    
    clone(pessoa: Pessoa): Pessoa {
        let clonePessoa = new Pessoa();
        
        if (pessoa === null || pessoa === undefined)
            pessoa = new Pessoa();
        
        if(this.getValue(pessoa, "getSexo") == "")
            clonePessoa.setSexo(undefined);
        else if (this.getValue(pessoa, "getSexo") == undefined)
            clonePessoa.setSexo("");
        else
            clonePessoa.setSexo(this.getValue(pessoa, "getSexo"));
        
        clonePessoa.setId(this.getValue(pessoa, "getId"));
        clonePessoa.setVersion(this.getValue(pessoa, "getVersion"));
        clonePessoa.setNome(this.getValue(pessoa, "getNome"));
        clonePessoa.setCpf(this.getValue(pessoa, "getCpf"));
        clonePessoa.setDataNascimento(this.getValue(pessoa, "getDataNascimento"));
        clonePessoa.setRg(this.getValue(pessoa, "getRg"));
        clonePessoa.setIdade(this.getValue(pessoa, "getIdade"));
        
        if( this.getValue(pessoa, "getEndereco") !== undefined ) {
            if( Object.keys(this.getValue(pessoa, "getEndereco")).length == 2 )
                clonePessoa.setEndereco(undefined);            
            else
                clonePessoa.setEndereco(
                        new EnderecoBuilder().clone(this.getValue(pessoa, "getEndereco")));
        } else {
            clonePessoa.setEndereco(new EnderecoBuilder().initialize(null));
        }
        
        clonePessoa.setTelefones(
                new TelefoneBuilder().cloneList(this.getValue(pessoa, "getTelefones")));

        return clonePessoa;
    }
    
    cloneList(pessoas: Array<Pessoa>): Array<Pessoa> {
        let array:Array<Pessoa> = new Array<Pessoa>();
    
        if (pessoas !== null && pessoas !== undefined) { 
            for (let pessoa of pessoas) {
                array.push(this.clone(pessoa));
            }
        }
        
        return array;
    }
    
    
}