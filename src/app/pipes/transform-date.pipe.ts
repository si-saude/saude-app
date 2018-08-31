import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'transformDate' } )
export class TransformDatePipe implements PipeTransform {

    transform(value) {
        if(value){
            let date : Date = new Date();
            if((typeof value === 'string')){
                value = value.replace("[UTC]","");
                date = new Date(value);
            }
            else
                date = value;
            
            return date.toLocaleDateString('pt-br');     
        }
    }
}