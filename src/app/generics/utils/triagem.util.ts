import { Atendimento } from './../../model/atendimento';

export class TriagemUtil {
    
    verifyValidTriagens( triagens ) {
        let triagem = triagens.find( t => {
            if ( t.getIndicadorSast().getObrigatorio() == true && t.getIndice() == -1 )
                return true;
            else return false;
        } );

        if ( triagem != undefined ) return false;
        else return true;
    }
    
    selectNivelAtividadeFisica(atendimento: Atendimento, evento: string) {
        if ( evento.includes("SEDENT") ) {
            atendimento.getTriagens()[0].setIndice(0);
            this.selectTriagem(0,0);
        }
        else if ( evento == "IRREGULAR ATIVO B" ) {
            atendimento.getTriagens()[0].setIndice(1);
            this.selectTriagem(0,1);
        }
        else if ( evento == "IRREGULAR ATIVO A" ) {
            atendimento.getTriagens()[0].setIndice(2);
            this.selectTriagem(0,2);
        }
        else if ( evento == "REGULARMENTE ATIVO" ) {
            atendimento.getTriagens()[0].setIndice(3);
            this.selectTriagem(0,3);
        }
        else if ( evento == "MUITO ATIVO" ) {
            atendimento.getTriagens()[0].setIndice(4);
            this.selectTriagem(0,4);
        }
    }
    
    selectDor(atendimento: Atendimento, evento) {
        if ( evento.includes("INSUPORT") ) {
            atendimento.getTriagens()[2].setIndice(0);
            this.selectTriagem(2,0);
        }
        else if ( evento == "SEVERA" ) {
            atendimento.getTriagens()[2].setIndice(1);
            this.selectTriagem(2,1);
        }
        else if ( evento == "MODERADA" ) {
            atendimento.getTriagens()[2].setIndice(2);
            this.selectTriagem(2,2);
        }
        else if ( evento == "PEQUENA") {
            atendimento.getTriagens()[2].setIndice(3);
            this.selectTriagem(2,3);
        }
        else if ( evento == "AUSENTE"  ) {
            atendimento.getTriagens()[2].setIndice(4);
            this.selectTriagem(2,4);
        }
    }
    
    selectTriagem( indexTriagem, indice ) {
        let i: string = "indice" + indice + "_" + indexTriagem;
        let p: string = "";
    
        for ( let ii = 0; ii <= 4; ii++ ) {
            p = "indice" + ii + "_" + indexTriagem;
            $( "td[title=" + p + "]" ).css( "backgroundColor", "" );
        }
    
        $( "td[title=" + i + "]" ).css( "backgroundColor", "#D4D4D4" );
    }
    
}