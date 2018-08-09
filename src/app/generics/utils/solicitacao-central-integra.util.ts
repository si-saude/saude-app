import { SolicitacaoCentralIntegra } from './../../model/solicitacao-central-integra';

export class SolicitacaoCentralIntegraUtil {
    
    setColor( value: string ) {
        let c = value.valueOf();
        c = this.transform(c)
        let ret;
        switch( c ) {
            case "ABERTO":
                ret = {'background': 'white', 'color': 'black'};
                return ret;
            case "PLANEJADO":
                ret = {'background': 'blue'};
                return ret;
            case "CONCLU":
                ret = {'background': 'green', 'color': 'white'};
                return ret;
            case "CANCELADO":
                ret = {'background': 'red'};
                return ret;
            case "EXECU":
                ret = {'background': 'yellow'};
                return ret;
            case "AGUARDANDOINFORMA":
                ret = {'background': 'orange'};
                return ret;
            default:
                ret = {'background': 'blueviolet'};
                return ret;
        }
    }
    
    transform( value: string ) {
        if ( value.includes("EXECU") )
            return "EXECU";
        else if ( value.includes("AGUARDANDO INFORMA") )
            return "AGUARDANDOINFORMA";
        else if ( value.includes("CONCLU") )
            return "CONCLU";
        else return value;
    }
    
    setStyleAtrasado( solicitacao: SolicitacaoCentralIntegra ) {
        if ( solicitacao.getAtrasado() )
            return 'background : #f78181';
        return '#fff';
    }
    
    setNgStyleAtrasado( solicitacao: SolicitacaoCentralIntegra ) {
        if ( solicitacao.getAtrasado() )
            return {'background' : '#f78181'};
        return {'background' : ''};
    }
}