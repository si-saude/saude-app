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

}