import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'transformDate' } )
export class TransformDatePipe implements PipeTransform {

    transform( value: Date ) {
        let date: string;
        let arrayDate: Array<string>;
        if ( value ) {
            date = value.toString();
            arrayDate = date.split('T');
            arrayDate = arrayDate[0].split('-');
            date = arrayDate[2] + '/' + arrayDate[1] + '/' + arrayDate[0];
        }
        return date;
    }
}