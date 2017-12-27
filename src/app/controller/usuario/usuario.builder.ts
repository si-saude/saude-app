import { Usuario } from './../../model/usuario';
import { PerfilBuilder } from './../perfil/perfil.builder';
import { PessoaBuilder } from './../pessoa/pessoa.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class UsuarioBuilder extends GenericBuilder {

    initialize(usuario: Usuario) {
        usuario = new Usuario();
        
        usuario.setPerfis(new PerfilBuilder().initializeList(this.getValue(usuario,"getPerfis")));
        usuario.setPessoa(new PessoaBuilder().initialize(this.getValue(usuario, "getPessoa")));
        
        return usuario;
    }
    
    clone(usuario: Usuario): Usuario {
        
        if (usuario === null || usuario === undefined)
            usuario = new Usuario();
        
        let cloneUsuario = new Usuario();
        cloneUsuario.setId(this.getValue(usuario,"getId"));
        cloneUsuario.setVersion(this.getValue(usuario, "getVersion"));
        cloneUsuario.setChave(this.getValue(usuario, "getChave"));
        cloneUsuario.setSenha(this.getValue(usuario, "getSenha"));
        cloneUsuario.setGestorCss(this.getValue(usuario, "getGestorCss"));
        cloneUsuario.setToken(this.getValue(usuario, "getToken"));
        
        cloneUsuario.setPerfis(new PerfilBuilder().cloneList(this.getValue(usuario, "getPerfis")));
        
        if (this.getValue(usuario, "getPessoa") !== undefined) { 
            cloneUsuario.setPessoa(
                    new PessoaBuilder().clone(this.getValue(usuario,"getPessoa")));
            if(!this.idGtZero(cloneUsuario.getPessoa()))
                cloneUsuario.setPessoa(undefined);
        } else {
            cloneUsuario.setPessoa(new PessoaBuilder().initialize(null));
        }
        
        return cloneUsuario;
    }
    
}