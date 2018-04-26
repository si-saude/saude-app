import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'filterData' } )
export class FilterDataPipe implements PipeTransform {
    private arrayFiltered: any[];
    private mapValue = [[]];
    private mapTypes: Array<string>;
    private savedArray: Array<any>;
    private lastFlagArray: Array<any> = new Array<any>();

    constructor() {
        this.mapTypes = new Array<string>();
        this.savedArray = new Array<any>();
    }

    transform( array: any[], filter: any, tipo: string, value: string ) {
        let typeofFilter = typeof filter;
        
        if ( tipo == undefined ) {
            this.arrayFiltered = array;
        } else if ( typeofFilter == 'string' && filter == '' ) {
            return this.savedArray;
        }
            
        if ( tipo != "" && filter ) {
            let arrayString: Array<string> = new Array<string>();
            
            array = this.arrayFiltered;
            
            if ( this.mapValue[tipo] == undefined ) {
                this.mapValue[tipo] = new Array<string>();
                
                if ( typeofFilter == 'string' ) 
                    this.mapValue[tipo] = "$"+filter;
                else this.mapValue[tipo] = filter.data;
                
                this.mapTypes.push( tipo );
            } else {
                arrayString = this.mapValue[tipo].split("$");
                
                if ( typeofFilter == 'string' ) {
                    if ( arrayString.find(a => a == filter) == undefined )
                        this.mapValue[tipo] += "$"+filter;
                    else {
                        arrayString.splice(arrayString.indexOf(filter), 1);
                        for ( let i = 0; i< arrayString.length; i++ ) {
                            if ( i == 0 ) this.mapValue[tipo] = arrayString[0];
                            else this.mapValue[tipo] += "$"+arrayString[i];
                        }
                    }
                } else {
                    if ( filter.data == null || filter.data == undefined ) {
                        for ( let i = 0; i < arrayString.length; i++ ) {
                            let delString = arrayString[0].length - value.length;
                            if ( i == 0 ) this.mapValue[tipo] = arrayString[0].substring( 0, arrayString[0].length - delString );
                            else this.mapValue[tipo] += "$"+arrayString[i]; 
                        }
                    }
                    else {
                        arrayString[0] = arrayString[0] + filter.data;
                        for ( let i = 0; i < arrayString.length; i++ ) {
                            if ( i == 0 ) this.mapValue[tipo] = arrayString[0];
                            else this.mapValue[tipo] += "$"+arrayString[i];
                        }
                    }
                }
            }
            
            
            for ( let i = 0; i < this.mapTypes.length; i++ ) {
                arrayString = this.mapValue[this.mapTypes[i]].split("$");
                for ( let i1 = 0; i1 < arrayString.length; i1++ ) {
                    if ( arrayString[i1] == '' ) continue;
                    if ( i1 <= 1 ) {
                        array = array.filter(a => {
                                    if ( a[this.mapTypes[i]] != undefined )
                                        return (a[this.mapTypes[i]].indexOf(arrayString[i1]) > -1);
                                    else return false;
                                }) 
                    }
                    else {
                        Array.prototype.push.apply(
                                array,
                                this.arrayFiltered.filter(a => { 
                                    if ( a[this.mapTypes[i]] != undefined )
                                        return (a[this.mapTypes[i]].indexOf(arrayString[i1]) > -1);
                                    else return false;
                                }) 
                        );
                    } 
                }
            }
        }
        
        this.savedArray = array;
        return array;
    }
}