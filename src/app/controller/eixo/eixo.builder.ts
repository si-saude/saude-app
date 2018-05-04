import { Eixo } from './../../model/eixo';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class EixoBuilder extends GenericBuilder {
    
    initialize(eixo: Eixo) {
        eixo = new Eixo();
        
        eixo.setEquipe(new EquipeBuilder().initialize(new Equipe()));
        
        return eixo;
    }
    
    initializeList(eixos: Array<Eixo>) {
        
        let array:Array<Eixo> = new Array<Eixo>();
        
        if(eixos === null || eixos === undefined)
            eixos = new Array<Eixo>();
        
        for (let eixo of eixos) {
            array.push(this.initialize(eixo));
        }
        
        return array;
    }
    
    clone(eixo: Eixo): Eixo {
        let cloneEixo: Eixo = new Eixo();
    
        if (eixo === null || eixo === undefined)
            eixo = new Eixo();
        
        cloneEixo.setId(this.getValue(eixo,"getId"));
        cloneEixo.setVersion(this.getValue(eixo,"getVersion"));
        cloneEixo.setTitulo(this.getValue(eixo,"getTitulo"));
        
        cloneEixo.setEquipe(this.getValue(eixo,"getEquipe"));
        
        return cloneEixo;
    }
    
    cloneList(eixos: Array<Eixo>): Array<Eixo> {
        let array:Array<Eixo> = new Array<Eixo>();
    
        if (eixos !== null && eixos !== undefined) { 
            for (let eixo of eixos) {
                array.push(this.clone(eixo));
            }
        }
        
        return array;
    }
    
}