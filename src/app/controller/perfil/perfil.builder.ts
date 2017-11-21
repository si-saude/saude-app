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
    
    initializeList(perfis: Array<Perfil>) {
        
        let array:Array<Perfil> = new Array<Perfil>();
        
        if(perfis === null || perfis === undefined)
            perfis = new Array<Perfil>();
        
        for (let perfil of perfis) {
            array.push(this.initialize(perfil));
        }
        
        return array;
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
    
    cloneList(perfis: Array<Perfil>): Array<Perfil> {
        let array:Array<Perfil> = new Array<Perfil>();
    
        if (perfis !== null && perfis !== undefined) { 
            for (let perfil of perfis) {
                array.push(this.clone(perfil));
            }
        }
        
        return array;
    }
}