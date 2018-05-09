import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'filterData' } )
export class FilterDataPipe implements PipeTransform {
    private arrayFiltered: any[];
    private mapValue = [[]];
    private mapTypes: Array<string>;
    private savedArray: Array<any>;
    private previewArrayReturn: Array<any>;
    private arrayReturn: Array<any>;

    constructor() {
        this.mapTypes = new Array<string>();
        this.savedArray = new Array<any>();
        this.previewArrayReturn = new Array<any>();
        this.arrayReturn = new Array<any>();
    }

    transform( array: any[], filter: any, tipo: string, value: string ) {
        let typeofFilter = typeof filter;
            
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
            for ( let i = 0; i < this.mapTypes.length; i++ ) {
                arrayString = this.mapValue[this.mapTypes[i]].split("$");
                for ( let i1 = 0; i1 < arrayString.length; i1++ ) {
                    if ( i1 == 0 ) {
                        this.arrayReturn = this.previewArrayReturn.filter(a => {
                            if ( a[this.mapTypes[i]] != undefined )
                                return (a[this.mapTypes[i]].indexOf(arrayString[i1]) > -1);
                            else return false;
                        })
                        this.previewArrayReturn = this.arrayReturn;
                    } else if ( i == 0 && i1 == 1 ) {
                        this.arrayReturn = this.arrayFiltered.filter(a => {
                                    if ( a[this.mapTypes[i]] != undefined )
                                        return (a[this.mapTypes[i]].indexOf(arrayString[i1]) > -1);
                                    else return false;
                                })
                        this.previewArrayReturn = this.arrayReturn;
                    } else if ( i == 0 && i1 > 1 ) {
                        Array.prototype.push.apply(
                                this.arrayReturn,
                                this.arrayFiltered.filter(a => {
                                    if ( a[this.mapTypes[i]] != undefined )
                                        return (a[this.mapTypes[i]].indexOf(arrayString[i1]) > -1);
                                    else return false;
                                })
                        );
                        this.previewArrayReturn = this.arrayReturn;
                    } else if ( i > 0 && i1 == 1 ) {
                        this.arrayReturn = this.previewArrayReturn.filter(a => {
                            if ( a[this.mapTypes[i]] != undefined )
                                return (a[this.mapTypes[i]].indexOf(arrayString[i1]) > -1);
                            else return false;
                        })
                    } else if ( i > 0 && i1 > 1 ) {
                        Array.prototype.push.apply(
                                this.arrayReturn,
                                this.previewArrayReturn.filter(a => {
                                    if ( a[this.mapTypes[i]] != undefined )
                                        return (a[this.mapTypes[i]].indexOf(arrayString[i1]) > -1);
                                    else return false;
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
}