import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'cep' } )
export class CepPipe implements PipeTransform {
    
    transform( value: string, fieldId: string ) {
        if ( value ) {
            value = value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})?/, "$1-$2");
        }
        
        if(fieldId)
            $('#'+fieldId).val(value);
        
        return value;
    }
}