import {Pipe, PipeTransform} from "@angular/core";
 
@Pipe({name: 'cpfMask'})
export class CpfPipe implements PipeTransform{
 
    transform(value:string, fieldId:string){
       
       if(value){

           value = value.replace(/\D/g, "");
           
           let newValue = value;
            
            if(value.length >= 3)
                newValue = value.substring(0,3);

            if(value.length > 3)
                newValue += "."+value.substring(3,6);

            if(value.length > 6)
                newValue += "."+value.substring(6,9)

            if(value.length > 9)
                newValue += "-"+value.substring(9,value.length);

            value = newValue;
        }
        
       if(fieldId)
            $('#'+fieldId).val(value);
       
        return value;
    }
}