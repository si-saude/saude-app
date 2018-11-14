import { AsoAvaliacao } from './../../model/aso-avaliacao';
import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../usuario/usuario.builder';
import { Aso } from './../../model/aso';
import { GenericBuilder } from './../../generics/generic.builder';

export class AsoAvaliacaoBuilder extends GenericBuilder {
    
    initialize(asoAvaliacao: AsoAvaliacao) {
        asoAvaliacao = new AsoAvaliacao(); 
        asoAvaliacao.setAso(new Aso());
        
        return asoAvaliacao;
    }
    
    initializeList(asoAvaliacoes: Array<AsoAvaliacao>) {
        
        let array:Array<AsoAvaliacao> = new Array<AsoAvaliacao>();
        
        if(asoAvaliacoes === null || asoAvaliacoes === undefined)
            asoAvaliacoes = new Array<AsoAvaliacao>();
        
        for (let asoAvaliacao of asoAvaliacoes) {
            array.push(this.initialize(asoAvaliacao));
        }
        
        return array;
    }
    
    clone(asoAvaliacao: AsoAvaliacao): AsoAvaliacao {
        
        if (asoAvaliacao === null || asoAvaliacao === undefined)
            asoAvaliacao = new AsoAvaliacao();
        
        let cloneAsoAvaliacao = new AsoAvaliacao();
        cloneAsoAvaliacao.setId(this.getValue(asoAvaliacao,"getId"));
        cloneAsoAvaliacao.setVersion(this.getValue(asoAvaliacao,"getVersion"));
        cloneAsoAvaliacao.setDescricao(this.getValue(asoAvaliacao,"getDescricao"));       
        cloneAsoAvaliacao.setConforme(this.getValue(asoAvaliacao, "getConforme"))    
        cloneAsoAvaliacao.setAso(new Aso());
        
        return cloneAsoAvaliacao;
    }
    
    cloneList(asoAvaliacoes: Array<AsoAvaliacao>): Array<AsoAvaliacao> {
        let array:Array<AsoAvaliacao> = new Array<AsoAvaliacao>();
    
        if (asoAvaliacoes !== null && asoAvaliacoes !== undefined) { 
            for (let asoAvaliacao of asoAvaliacoes) {
                array.push(this.clone(asoAvaliacao));
            }
        }
        
        return array;
    }
    
}