import { AsoAlteracao } from './../../model/aso-alteracao';
import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../usuario/usuario.builder';
import { Aso } from './../../model/aso';
import { GenericBuilder } from './../../generics/generic.builder';

export class AsoAlteracaoBuilder extends GenericBuilder {
    
    initialize(asoAlteracao: AsoAlteracao) {
        asoAlteracao = new AsoAlteracao();
        
        asoAlteracao.setUsuario(new UsuarioBuilder().initialize(new Usuario()));
        asoAlteracao.setAso(new Aso());
        
        return asoAlteracao;
    }
    
    initializeList(asoAlteracoes: Array<AsoAlteracao>) {
        
        let array:Array<AsoAlteracao> = new Array<AsoAlteracao>();
        
        if(asoAlteracoes === null || asoAlteracoes === undefined)
            asoAlteracoes = new Array<AsoAlteracao>();
        
        for (let asoAlteracao of asoAlteracoes) {
            array.push(this.initialize(asoAlteracao));
        }
        
        return array;
    }
    
    clone(asoAlteracao: AsoAlteracao): AsoAlteracao {
        
        if (asoAlteracao === null || asoAlteracao === undefined)
            asoAlteracao = new AsoAlteracao();
        
        let cloneAsoAlteracao = new AsoAlteracao();
        cloneAsoAlteracao.setId(this.getValue(asoAlteracao,"getId"));
        cloneAsoAlteracao.setVersion(this.getValue(asoAlteracao,"getVersion"));
        cloneAsoAlteracao.setStatus(this.getValue(asoAlteracao,"getStatus"));
        cloneAsoAlteracao.setData(this.getValue(asoAlteracao,"getData"));
        
        cloneAsoAlteracao.setAso(new Aso());
        cloneAsoAlteracao.setUsuario(new UsuarioBuilder().clone(this.getValue(asoAlteracao,"getUsuario")));
        
        return cloneAsoAlteracao;
    }
    
    cloneList(asoAlteracoes: Array<AsoAlteracao>): Array<AsoAlteracao> {
        let array:Array<AsoAlteracao> = new Array<AsoAlteracao>();
    
        if (asoAlteracoes !== null && asoAlteracoes !== undefined) { 
            for (let asoAlteracao of asoAlteracoes) {
                array.push(this.clone(asoAlteracao));
            }
        }
        
        return array;
    }
    
}