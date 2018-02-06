import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'dtHrMask' } )
export class DateHourPipe implements PipeTransform {

    transform( value: Date ) {
        let dtHr: string;
        if ( value ) {
            dtHr = value.toString();
            console.log(value);    
        }
        return dtHr;
    }
}