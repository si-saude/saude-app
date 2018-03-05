import { FichaColeta } from './../../model/ficha-coleta';
import { RespostaFichaColeta } from './../../model/resposta-ficha-coleta';
import { RespostaFichaColetaBuilder } from './../resposta-ficha-coleta/resposta-ficha-coleta.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class FichaColetaBuilder extends GenericBuilder{
    
    initialize(fichaColeta: FichaColeta): FichaColeta {
        fichaColeta = new FichaColeta();
        
        fichaColeta.setRespostaFichaColetas(
                new RespostaFichaColetaBuilder().initializeList(new Array<RespostaFichaColeta>()));
        
        return fichaColeta;
    }
    
    initializeList(fichaColetas: Array<FichaColeta>) {
        
        let array: Array<FichaColeta> = new Array<FichaColeta>();
        
        if(fichaColetas === null || fichaColetas === undefined)
            fichaColetas = new Array<FichaColeta>();
        
        for (let fichaColeta of fichaColetas) {
            array.push(this.initialize(fichaColeta));
        }
        
        return array;
    }
    
    clone(fichaColeta: FichaColeta): FichaColeta {        
        let cloneFichaColeta = new FichaColeta();
        
        if (fichaColeta === null || fichaColeta === undefined)
            fichaColeta = new FichaColeta();
        
        cloneFichaColeta.setId(this.getValue(fichaColeta, "getId"));
        cloneFichaColeta.setVersion(this.getValue(fichaColeta, "getVersion"));
        
        cloneFichaColeta.setRespostaFichaColetas(
                new RespostaFichaColetaBuilder().cloneList(
                        this.getValue(fichaColeta, "getRespostaFichaColetas")));        
        
        return cloneFichaColeta;
    } 
    
    cloneList(fichaColetas: Array<FichaColeta>): Array<FichaColeta>{
        let array:Array<FichaColeta> = new Array<FichaColeta>();
    
        if (fichaColetas !== null && fichaColetas !== undefined) {
            for (let fichaColeta of fichaColetas) {
                array.push(this.clone(fichaColeta));
            }
        }
    
        return array;
    }
    
}