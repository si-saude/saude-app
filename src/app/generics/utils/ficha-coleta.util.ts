import { RespostaFichaColeta } from './../../model/resposta-ficha-coleta';
import { FichaColeta } from './../../model/ficha-coleta';

export class FichaColetaUtil {
    
    verifyValidFichaColeta( fichaColeta: FichaColeta, idEquipeProfissional: number ) {
        let respostas: Array<RespostaFichaColeta> = new Array<RespostaFichaColeta>();
        let ret: boolean = true;
        let resp: RespostaFichaColeta = fichaColeta.getRespostaFichaColetas()
            .find( r => r.getPergunta().getGrupo() == 'ANAMNESE' && r.getPergunta().getCodigo() == '0008' &&
                        r.getConteudo() != 'SIM');
        
        fichaColeta.getRespostaFichaColetas().forEach(rFC => {
            if ( rFC.getPergunta().getEquipes().find(e => e.getId() == idEquipeProfissional ) != undefined &&
                    ((rFC.getPergunta().getGrupo().includes( "TESTE DE FAGERSTR" ) && resp == undefined) || 
                            !rFC.getPergunta().getGrupo().includes( "TESTE DE FAGERSTR" )) )
                respostas.push(rFC);
        })
        
        respostas.forEach( r => {
            if ( r.getConteudo() == "" ) ret = false;
        } )
        
        return ret;
    }
    
}