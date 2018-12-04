export class Util {

    public static isNotNull( object ) {
        if ( object != null && object != undefined && object != '' )
            return true;
        else
            return false;
    }

    public static treatCpf( cpf: string ) {
        let s: string;

        if ( cpf != undefined ) {
            if ( cpf.length > 11 ) {
                s = cpf.substring( 0, 3 );
                s += cpf.substring( 4, 7 );
                s += cpf.substring( 8, 11 );
                s += cpf.substring( 12, 14 );
                return s;
            } else if ( cpf.length > 0 && cpf.length < 14 ) {
                return cpf;
            }
        } return undefined;
    }
    
    public static treatDouble( value ) {
        if(value){
            
            value = value.toString();
            
            if(!value.includes(',')){
                if(!value.includes('.')){
                    value += '00';
                }else{
                    let values = value.split('.');
                    
                    if(values[values.length - 1].length == 1)
                        value += '0';
                }
                value = Util.formatNumber(value);
            }else
                value = value.replace(/\./g, '').replace(',', '.');
            
        }
        if ( value == 0 ) value = undefined;
        return value;
    }
    
    public static formatNumber( value ) {        
        value = value.toString().replace(/\D/g, "");
        value = Number(value).toString();
        let len = value.length;

        if ( 1 == len )
            value = value.replace( /(\d)/, "0,0$1" );
        else if ( 2 == len )
            value = value.replace( /(\d)/, "0,$1" );
        else if ( len > 2 ) {

            let length = 1;
            let qtd = value.length - 2;
            let mod = qtd % 3;
            qtd = Math.floor( qtd / 3 );

            let regex = "";
            if ( mod > 0 ) {
                regex = "(\\d{" + mod + "})";
                length++;
            }
            for ( let x = 0; x < qtd; x++ ) {
                regex += "(\\d{3})";
                length++;
            }

            regex += "(\\d{2})";

            let pattern = "";

            for ( let x = 1; x < length; x++ ) {
                if ( x > 1 )
                    pattern += ".";
                pattern += "$" + x;
            }

            pattern += ",$" + ( length );
            value = value.replace( new RegExp( regex ), pattern );
        }
        
        return value;
    }

}