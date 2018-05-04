import { Diagnostico } from './../../model/diagnostico';
import { Eixo } from './../../model/eixo';
import { EixoBuilder } from './../eixo/eixo.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class DiagnosticoBuilder extends GenericBuilder {
    
    initialize(diagnostico: Diagnostico) {
        diagnostico = new Diagnostico();
        
        diagnostico.setEixo(new EixoBuilder().initialize(new Eixo()))
        
        return diagnostico;
    }
    
    initializeList(diagnosticos: Array<Diagnostico>) {
        
        let array:Array<Diagnostico> = new Array<Diagnostico>();
        
        if(diagnosticos === null || diagnosticos === undefined)
            diagnosticos = new Array<Diagnostico>();
        
        for (let diagnostico of diagnosticos) {
            array.push(this.initialize(diagnostico));
        }
        
        return array;
    }
    
    clone(diagnostico: Diagnostico): Diagnostico {
        let cloneDiagnostico: Diagnostico = new Diagnostico();
    
        if (diagnostico === null || diagnostico === undefined)
            diagnostico = new Diagnostico();
        
        cloneDiagnostico.setId(this.getValue(diagnostico,"getId"));
        cloneDiagnostico.setVersion(this.getValue(diagnostico,"getVersion"));
        cloneDiagnostico.setCodigo(this.getValue(diagnostico,"getCodigo"));
        cloneDiagnostico.setDescricao(this.getValue(diagnostico,"getDescricao"));
        cloneDiagnostico.setInativo(this.getValue(diagnostico,"getInativo"));
        
        cloneDiagnostico.setEixo(new EixoBuilder().clone(this.getValue(diagnostico, "getEixo")));
        
        return cloneDiagnostico;
    }
    
    cloneList(diagnosticos: Array<Diagnostico>): Array<Diagnostico> {
        let array:Array<Diagnostico> = new Array<Diagnostico>();
    
        if (diagnosticos !== null && diagnosticos !== undefined) { 
            for (let diagnostico of diagnosticos) {
                array.push(this.clone(diagnostico));
            }
        }
        
        return array;
    }
    
}