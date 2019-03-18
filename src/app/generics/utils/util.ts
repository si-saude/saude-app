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
        let returnAux  = value;
        if(returnAux != undefined){
            
            returnAux = returnAux.toString();
            
            if(!returnAux.includes(',')){
                if(!returnAux.includes('.')){
                    returnAux += '00';
                }else{
                    let values = returnAux.split('.');
                    
                    if(values[values.length - 1].length == 1)
                        returnAux += '0';
                }
                returnAux = Util.formatNumber(returnAux);
            }else
                returnAux = returnAux.replace(/\./g, '').replace(',', '.');
            
        }          
        return returnAux;
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
    
    public static baixar( data, fileName, file ) {
        let byteCharacters;
        
        if ( file == 'arquivo-zip' )
            byteCharacters = atob(data);
        else byteCharacters = atob(data._body);
        let byteArrays = [];
        let sliceSize = 1024;

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        
        let blob = new Blob(byteArrays);
        let url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = fileName;
        anchor.href = url;
        document.body.appendChild(anchor);
        anchor.click();
    }
    
    public static calculoProporcao(valorT, gramaT, valorP){        
        
        let proporcao = ((Util.treatDouble(valorP)*Util.treatDouble(gramaT))/Util.treatDouble(valorT));
        
        return proporcao
         
     }
    

}