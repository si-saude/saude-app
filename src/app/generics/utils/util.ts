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
    
    public static treatDouble(value: string) {
        let ret: any = undefined;
        if ( value != undefined && value.toString() != '0' ) {
            value = value.toString();
            if ( value.indexOf(',') > -1 ) {
                let indexComma = value.indexOf(',');
                value = value.substring(0, indexComma) + 
                    value.substring(indexComma+1, indexComma+2) +
                    value.substring(indexComma+2, value.length);
                let realValue = value.replace(/\./gi, "");
                ret = Number(realValue.replace(/\,/gi, "."));
            } else {
                if ( value.indexOf('.') == -1 ) 
                    ret = Number(value);
                else ret = value.replace(/\.|\,||/gi, "");
            }
        }
        return ret; 
    }

}