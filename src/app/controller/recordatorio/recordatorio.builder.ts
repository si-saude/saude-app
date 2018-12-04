import { Recordatorio } from './../../model/recordatorio';
import { Atendimento } from './../../model/atendimento';
import { RefeicaoBuilder } from './../refeicao/refeicao.builder';
import { GenericBuilder } from './../../generics/generic.builder';
import { Util } from './../../generics/utils/util';

export class RecordatorioBuilder extends GenericBuilder {

    initialize(recordatorio: Recordatorio) {
        recordatorio = new Recordatorio();
        
        recordatorio.setAtendimento(new Atendimento());
        recordatorio.setRefeicoes(new RefeicaoBuilder().initializeList(null));
        
        return recordatorio;
    }
    
    initializeList(recordatorios: Array<Recordatorio>) {
        
        let array:Array<Recordatorio> = new Array<Recordatorio>();
        
        if(recordatorios === null || recordatorios === undefined)
            recordatorios = new Array<Recordatorio>();
        
        for (let recordatorio of recordatorios) {
            array.push(this.initialize(recordatorio));
        }
        
        return array;
    }
    
    clone(recordatorio: Recordatorio): Recordatorio {
        
        if (recordatorio === null || recordatorio === undefined)
            recordatorio = new Recordatorio();
        
        let cloneRecordatorio = new Recordatorio();
        cloneRecordatorio.setId(this.getValue(recordatorio,"getId"));
        cloneRecordatorio.setNe(this.getValue(recordatorio, "getNe"));
        cloneRecordatorio.setTmb(this.getValue(recordatorio, "getTmb"));
        cloneRecordatorio.setVersion(this.getValue(recordatorio, "getVersion"));
        
        cloneRecordatorio.setAtendimento(new Atendimento());
        if ( this.getValue(recordatorio, "getRefeicoes") != undefined ) {
            cloneRecordatorio.setRefeicoes(new RefeicaoBuilder().cloneList(this.getValue(recordatorio,"getRefeicoes")));
        } else {
            cloneRecordatorio.setRefeicoes(undefined);
        }
        
        return cloneRecordatorio;
    }
    
    cloneList(recordatorios: Array<Recordatorio>): Array<Recordatorio> {
        let array:Array<Recordatorio> = new Array<Recordatorio>();
        if (recordatorios !== null && recordatorios !== undefined) { 
            for (let recordatorio of recordatorios) {
                array.push(this.clone(recordatorio));
            }
        }
        
        return array;
    }
    
    treatNe( value: string ) {
        if ( value != undefined ) {
            let realValue = value.toString().replace(/\.|\,||/gi, "");
            return Number(realValue.substring(0, realValue.length - 2)+"."+realValue.substring(realValue.length-2, realValue.length));
        }
    }
    
}