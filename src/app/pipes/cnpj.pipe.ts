import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'cnpj' } )
export class CnpjPipe implements PipeTransform {
    
    transform( value: string, fieldId: string ) {
        if ( value ) {
            value = value.replace(/\D/g, '').replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3/$4-$5");
        }
        
        if(fieldId)
            $('#'+fieldId).val(value);
        
        return value;
    }
}