import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'filterData' } )
export class FilterDataPipe implements PipeTransform {
    private arrayFiltered: any[];
    private mapType = [[]];
    private mapTypes: Array<string>;

    constructor() {
        this.mapTypes = new Array<string>();
    }

    transform( array: any[], filter: any, tipo: string ) {
        console.log(filter);
        
        if ( tipo != "" && filter ) {
            array = this.arrayFiltered;
            
//            if ( this.mapType[tipo] == undefined ) {
//                this.mapType[tipo] = new Array<string>();
//                this.mapType[tipo] = filter.data;
//                this.mapTypes.push( tipo );
//            } else {
//                if ( filter.data == null || filter.data == undefined ) {
//                    this.mapType[tipo] = this.mapType[tipo].substring( 0, this.mapType[tipo].length - 1 );
//                }
//                else {
//                    this.mapType[tipo] += filter.data;
//                }
//            }
//            
//            for ( let i = 0; i < this.mapTypes.length; i++ ) {
//                array = array.
//                    filter( a => a[this.mapTypes[i]].indexOf( this.mapType[this.mapTypes[i]] ) > -1 );
//            }
             

        } else {
            this.arrayFiltered = array;
        }
        
        return array;
    }
}