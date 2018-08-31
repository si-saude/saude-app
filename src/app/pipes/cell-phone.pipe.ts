import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'cellPhone' } )
export class CellPhonePipe implements PipeTransform {
    
    transform( value: string, fieldId: string ) {
        if ( value ) {
            
            value = value.replace(/\D/g, "");
            
            if ( value.length >= 2 )
                value = "(" + value.substr(0, 2) + ")" + value.substr(2, value.length);

            if ( value.length >= 5 )
                value = value.substr(0, 4) + " " + value.substr(4, value.length);
            
            if ( value.length >= 9 )
                value = value.substr(0, 9) + "-" + value.substr(9, value.length);
            
            if ( value.length >= 15 ) {
                let valueAux = value.split( "-" );
                value = valueAux[0] + valueAux[1].charAt( 0 ) + "-" + valueAux[1].substr( 1, valueAux[1].length );
            }

        }
        
        if(fieldId)
            $('#'+fieldId).val(value);
        
        return value;
    }
}