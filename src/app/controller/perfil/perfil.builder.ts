import { Perfil } from './../../model/perfil';
import { Permissao } from './../../model/permissao';
import { PermissaoBuilder } from './../permissao/permissao.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class PerfilBuilder extends GenericBuilder {
    
    initialize(perfil: Perfil) {
        perfil = new Perfil();
        
        perfil.setPermissoes(new PermissaoBuilder().initializeList(new Array<Permissao>()));
        
        return perfil;
    }
    
    clone(perfil: Perfil) {
        
        if (perfil === null || perfil === undefined)
            perfil = new Perfil();
        
        let clonePerfil = new Perfil();
        clonePerfil.setId(this.getValue(perfil,"getId"));
        clonePerfil.setVersion(this.getValue(perfil,"getVersion"));
        clonePerfil.setTitulo(this.getValue(perfil,"getTitulo"));
        
        clonePerfil.setPermissoes(
                new PermissaoBuilder().cloneList(
                        this.getValue(perfil,"getPermissoes")));
        
        return clonePerfil;
    }
}