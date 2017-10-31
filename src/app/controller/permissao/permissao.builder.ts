import { Permissao } from './../../model/permissao';
import { Perfil } from './../../model/perfil';
import { PerfilBuilder } from './../perfil/perfil.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class PermissaoBuilder extends GenericBuilder {
    
    initialize(permissao: Permissao) {
        permissao = new Permissao();
        
        permissao.setPerfil(new Perfil());
        
        return permissao;
    }
    
    initializeList(permissaos: Array<Permissao>) {
        
        let array:Array<Permissao> = new Array<Permissao>();
        
        if(permissaos === null || permissaos === undefined)
            permissaos = new Array<Permissao>();
        
        for (let permissao of permissaos) {
            array.push(this.initialize(permissao));
        }
        
        return array;
    }
    
    clone(permissao: Permissao): Permissao {
        
        if (permissao === null || permissao === undefined)
            permissao = new Permissao();
        
        let clonePermissao = new Permissao();
        clonePermissao.setId(this.getValue(permissao,"getId"));
        clonePermissao.setVersion(this.getValue(permissao,"getVersion"));
        clonePermissao.setEscrita(this.getValue(permissao,"getEscrita"));
        clonePermissao.setFuncionalidade(this.getValue(permissao,"getFuncionalidade"));
        clonePermissao.setLeitura(this.getValue(permissao,"getLeitura"));
        clonePermissao.setPerfil(new Perfil());
        
        return clonePermissao;
    }
    
    cloneList(permissaos: Array<Permissao>): Array<Permissao> {
        let array:Array<Permissao> = new Array<Permissao>();
    
        if (permissaos !== null && permissaos !== undefined) { 
            for (let permissao of permissaos) {
                array.push(this.clone(permissao));
            }
        }
        
        return array;
    }
    
}