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
    
}