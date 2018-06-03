export class SolicitacaoCentralIntegraUtil {
    
    setColor( color: string ) {
        color = this.transform(color);
        let ret;
        switch( color ) {
            case "ABERTO":
                ret = {'background': 'white', 'color': 'black'};
                return ret;
            case "PLANEJADO":
                ret = {'background': 'blue'};
                return ret;
            case "CONCLU":
                ret = {'background': 'yellow'};
                return ret;
            case "CANCELADO":
                ret = {'background': 'red'};
                return ret;
            case "EXECU":
                ret = {'background': 'green'};
                return ret;
            case "AGUARDANDO INFORMA":
                ret = {'background': 'grey'};
                return ret;
            default:
                ret = {'background': 'blueviolet'};
                return ret;
        }
    }
    
    transform( color: string ) {
        if ( color.includes("EXECU") )
            return "EXECU";
        else if ( color.includes("AGUARDANDO INFORMA") )
            return "AGUARDANDO INFORMA";
        else if ( color.includes("CONCLU") )
            return "CONCLU";
        else return color;
    }
    
}