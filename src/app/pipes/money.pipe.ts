import { Pipe, PipeTransform } from "@angular/core";

@Pipe( { name: 'money' } )
export class MoneyPipe implements PipeTransform {
    
    transform( value: string, fieldId: string ) {
        if ( value ) {
                
            value = value.toString().replace(/\D/g, "");
            value = Number(value).toString();
            
            let len = value.length;
            
            if ( 1 == len)
                value = value.replace(/(\d)/,"0,0$1");
            else if (2 == len)
                value = value.replace(/(\d)/,"0,$1");
            else if (len > 2) {
                
                let length = 1;
                let qtd = value.length - 2;
                let mod = qtd%3;
                qtd = Math.floor(qtd/3);
                
                
                let regex = "";
                if(mod > 0){
                    regex = "(\\d{"+mod+"})";
                    length++;
                }
                for(let x = 0; x < qtd; x++){
                    regex += "(\\d{3})";
                    length++;
                }

                regex += "(\\d{2})";
                
                let pattern = "";
                
                for(let x = 1; x < length; x++){
                    if(x > 1)
                        pattern+=".";
                    pattern+="$"+x;
                }
                
                pattern+=",$"+(length);
                value = value.replace(new RegExp(regex),pattern);
            }
        }
        
        if(fieldId)
            $('#'+fieldId).val(value);
        
        return value;
    }
}