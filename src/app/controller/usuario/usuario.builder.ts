import { Usuario } from './../../model/usuario';
import { PerfilBuilder } from './../perfil/perfil.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class UsuarioBuilder extends GenericBuilder {

    initialize(usuario: Usuario) {
        usuario = new Usuario();
        
        usuario.setPerfis(new PerfilBuilder().initializeList(this.getValue(usuario,"getPerfis")));
        
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
        cloneUsuario.setToken(this.getValue(usuario, "getToken"));
        
        cloneUsuario.setPerfis(new PerfilBuilder().cloneList(this.getValue(usuario, "getPerfis")));
        
        return cloneUsuario;
    }
    
}