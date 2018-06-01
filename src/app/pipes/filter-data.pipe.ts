import { Pipe, PipeTransform } from "@angular/core";

import { DateUtil } from './../generics/utils/date.util';

@Pipe( { name: 'filterData' } )
export class FilterDataPipe implements PipeTransform {
    private arrayFiltered: any[];
    private mapValue = [[]];
    private mapTypes: Array<string>;
    private savedArray: Array<any>;
    private previewArrayReturn: Array<any>;
    private arrayReturn: Array<any>;
    private dateUtil: DateUtil;

    constructor() {
        this.mapTypes = new Array<string>();
        this.savedArray = new Array<any>();
        this.previewArrayReturn = new Array<any>();
        this.arrayReturn = new Array<any>();
        this.dateUtil = new DateUtil();
    }

    transform( array: any[], filter: any, tipo: string, value: string ) {
        let typeofFilter = typeof filter;
        
        if ( value == "$*build*$" ) {
            this.arrayFiltered = array;
        }
        
        if ( value == "$*all*$" ) {
            this.mapTypes = new Array<string>();
            this.arrayFiltered = array;
            this.savedArray = array;
            return array;
        }
        
        if ( tipo == undefined || value == "$*new*$") {
            this.arrayFiltered = array;
            return this.arrayFiltered;
        } else if ( typeofFilter == 'string' && filter == '' ) {
            return this.savedArray;
        }
            
        if ( tipo != "" && filter ) {
            let arrayString: Array<string> = new Array<string>();
            if ( this.mapValue[tipo] == undefined ) {
                this.mapValue[tipo] = new Array<string>();
                
                if ( typeofFilter == 'string' ) 
                    this.mapValue[tipo] = "$"+filter;
                else 
                    this.mapValue[tipo] = filter.target.value;
                
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
                    this.mapValue[tipo] = filter.target.value;
//                    if ( filter.data == null || filter.data == undefined ) {
//                        for ( let i = 0; i < arrayString.length; i++ ) {
//                            let delString = arrayString[0].length - value.length;
//                            if ( i == 0 ) this.mapValue[tipo] = arrayString[0].substring( 0, arrayString[0].length - delString );
//                            else this.mapValue[tipo] += "$"+arrayString[i]; 
//                        }
//                    }
//                    else {
//                        if ( filter.data == undefined )
//                            arrayString[0] = arrayString[0] + filter.target.value;
//                        else 
//                            arrayString[0] = arrayString[0] + filter.data;
//                        for ( let i = 0; i < arrayString.length; i++ ) {
//                            if ( i == 0 ) this.mapValue[tipo] = arrayString[0];
//                            else this.mapValue[tipo] += "$"+arrayString[i];
//                        }
//                    }
                }
            }
            
            this.arrayReturn = new Array<any>();
            this.previewArrayReturn = this.arrayFiltered;
            let component = this;
            for ( let i = 0; i < this.mapTypes.length; i++ ) {
                arrayString = this.mapValue[this.mapTypes[i]].split("$");
                for ( let i1 = 0; i1 < arrayString.length; i1++ ) {
                    if ( i1 == 0 ) {
                        this.arrayReturn = this.previewArrayReturn.filter(a => {
                            return component.recursiveFilter(a, i, arrayString, i1);
                        })
                        this.previewArrayReturn = this.arrayReturn;
                        
                    } else if ( i == 0 && i1 == 1 ) {
                        this.arrayReturn = this.arrayFiltered.filter(a => {
                                return component.recursiveFilter(a, i, arrayString, i1);
                        })
                        this.previewArrayReturn = this.arrayReturn;
                    } else if ( i == 0 && i1 > 1 ) {
                        Array.prototype.push.apply(
                                this.arrayReturn,
                                this.arrayFiltered.filter(a => {
                                    return component.recursiveFilter(a, i, arrayString, i1);
                                })
                        );
                        this.previewArrayReturn = this.arrayReturn;
                    } else if ( i > 0 && i1 == 1 ) {
                        this.arrayReturn = this.previewArrayReturn.filter(a => {
                            return component.recursiveFilter(a, i, arrayString, i1);
                        })
                    } else if ( i > 0 && i1 > 1 ) {
                        Array.prototype.push.apply(
                                this.arrayReturn,
                                this.previewArrayReturn.filter(a => {
                                    return component.recursiveFilter(a, i, arrayString, i1);
                                })
                        );
                        this.previewArrayReturn = this.arrayReturn;
                    }
                }
            }
            
        }
        
        this.savedArray = this.arrayReturn;
        return this.arrayReturn;
    }
    
    getObject( a: any, i: number ) {
        let splitedMapTypes: Array<string> = this.mapTypes[i].split('-');
        
        if ( splitedMapTypes.length > 0 )
            for ( let i1 = 0; i1 < splitedMapTypes.length; i1++ )
                a = a + "." + splitedMapTypes[i1];
        
        if ( a[this.mapTypes[i]] != undefined )
            
            return a;
    }
    
    recursiveFilter(a, i, arrayString, i1) {
        let splitedMapTypes: Array<string> = this.mapTypes[i].split("-");
        
        if ( splitedMapTypes.length > 0 ) {
            for ( let i2 = 0; i2 < splitedMapTypes.length; i2++ ) {
                if ( a[splitedMapTypes[i2]] != undefined ) {
                    a = a["get"+splitedMapTypes[i2].substr(0,1).toUpperCase()+splitedMapTypes[i2].substr(1)]();
                }
                else return false;
            }
            return (a.toLowerCase().indexOf(arrayString[i1].toLowerCase()) > -1);
        } else {
            return (a[this.mapTypes[i]].toLowerCase().indexOf(arrayString[i1].toLowerCase()) > -1);
        }
    
    }
    
    convertTypeofDate(a) {
        
        if ( a instanceof Date )
            return this.dateUtil.parseDataToString(a);
        else return a;
    }
    
}