import { Pipe, PipeTransform } from "@angular/core";

import { DateUtil } from './../generics/utils/date.util';

@Pipe( { name: 'filterData' } )
export class FilterDataPipe implements PipeTransform {
    private savedArray: Array<any>;
    private mapValue:Map<string, Map<string,string>> = new Map<string, Map<string,string>>();
    private arrayCompleted: Array<any>;

    constructor() {

    }

    transform( array: any[], filter: any, tipo: string, value: string ) {
        
        if(filter == ''){
            if((this.savedArray == undefined && array.length > 0) || value == 'change'){
                this.savedArray = array;
                this.arrayCompleted = array;
            }
            
            if( value == "timeout" )
                return this.savedArray;
        }
        
        this.getFilter(tipo,value,filter);
        
        let pipe = this;
        
        //INSTANCIAR A VARI�VEL PARA MATRIZ DE FUN��ES
        
        let matrizFunc: Array<Array<any>> = new Array<Array<any>>();
        
        for(let key1 of Array.from(this.mapValue.keys())) {
            
            let functions: Array<any> = new Array<any>();
            
            for(let key2 of Array.from(this.mapValue.get(key1).keys())) {                
                if( this.mapValue.get(key1).get(key2) != undefined &&
                        this.mapValue.get(key1).get(key2).length > 0 ){
                    //INCREMENTAR A VARI�VEL LAMBDA
                    let filterFunction = function(obj) {
                        if ( pipe.doFilter(obj,key1) != undefined ) {
                            return pipe.doFilter(obj,key1).toString().toLowerCase()
                                    .includes(pipe.mapValue.get(key1).get(key2).toLowerCase());
                        } else return false;
                    };
                    functions.push(filterFunction);
                }
            }
            
            if(functions.length > 0)
                matrizFunc.push(functions); 
        }
        
        this.savedArray = this.arrayCompleted;
        
        //LER A MATRIZ DE FUNCTIONS, APLICANDO 'E' PARA CADA LINHA, E DENTRO DA LINHA APLICAR O OU PARA A COLUNA
        
        if(this.arrayCompleted != undefined)
            this.savedArray = this.arrayCompleted.filter(a => 
                matrizFunc.filter(ff => ff.filter(f => f(a)).length > 0).length == matrizFunc.length);
        
        return this.savedArray;
    }
    
    isNull(val1,val2){
        if(val1 == undefined || val1 == null || val1 == "")
            return val2;
        return val1;
    }
    
    getFilter(tipo,value,filter){
        filter = (filter == undefined ? filter : filter.toString());
        let val = this.isNull(value, filter);
        
        if (this.mapValue.get(tipo) == undefined)
            this.mapValue.set(tipo, new Map<string,string>());
        
        if(this.mapValue.get(tipo).get(val) == undefined || (value != undefined && value == tipo)){
            this.mapValue.get(tipo).set(val, filter);
        }else{
            this.mapValue.get(tipo).set(val, undefined);
        }
    }
    
    doFilter(obj, property){
        let properties = property.split("-");
        
        for ( let i = 0; i < properties.length; i++ ) {
            obj = obj[properties[i]];
        }
        
        return obj;
    }    
}