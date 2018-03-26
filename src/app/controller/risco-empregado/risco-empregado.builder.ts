import { RiscoEmpregado } from './../../model/risco-empregado';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { RiscoPotencial } from './../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../risco-potencial/risco-potencial.builder';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { Profissional } from './../../model/profissional';
import { ProfissionalSaudeBuilder } from './../profissional-saude/profissional-saude.builder';
import { Triagem } from './../../model/triagem';
import { TriagemBuilder } from './../triagem/triagem.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class RiscoEmpregadoBuilder extends GenericBuilder {
    
    initialize(riscoEmpregado: RiscoEmpregado) {
        riscoEmpregado = new RiscoEmpregado();
        
        riscoEmpregado.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        riscoEmpregado.setRiscoPotencial(new RiscoPotencialBuilder().initialize(new RiscoPotencial()));
        riscoEmpregado.setEquipe(new EquipeBuilder().initialize(new Equipe()));
        riscoEmpregado.setProfissional(new ProfissionalSaudeBuilder().initialize(new Profissional()));
        riscoEmpregado.setTriagens(new Array<Triagem>());
        
        return riscoEmpregado;
    }
    
    initializeList(riscoEmpregados: Array<RiscoEmpregado>) {
        
        let array:Array<RiscoEmpregado> = new Array<RiscoEmpregado>();
        
        if(riscoEmpregados === null || riscoEmpregados === undefined)
            riscoEmpregados = new Array<RiscoEmpregado>();
        
        for (let riscoEmpregado of riscoEmpregados) {
            array.push(this.initialize(riscoEmpregado));
        }
        
        return array;
    }
    
    clone(riscoEmpregado: RiscoEmpregado): RiscoEmpregado {
        
        if (riscoEmpregado === null || riscoEmpregado === undefined)
            riscoEmpregado = new RiscoEmpregado();
        
        let cloneRiscoEmpregado = new RiscoEmpregado();
        cloneRiscoEmpregado.setId(this.getValue(riscoEmpregado,"getId"));
        cloneRiscoEmpregado.setVersion(this.getValue(riscoEmpregado,"getVersion"));
        cloneRiscoEmpregado.setValor(this.getValue(riscoEmpregado,"getValor"));
        
        cloneRiscoEmpregado.setRiscoPotencial(
                new RiscoPotencialBuilder().clone(this.getValue(riscoEmpregado,"getRiscoPotencial")));
        cloneRiscoEmpregado.setEmpregado(new EmpregadoBuilder().clone(this.getValue(riscoEmpregado,"getEmpregado")));
        cloneRiscoEmpregado.setEquipe(new EquipeBuilder().clone(this.getValue(riscoEmpregado,"getEquipe")));
        cloneRiscoEmpregado.setProfissional(
                new ProfissionalSaudeBuilder().clone(this.getValue(riscoEmpregado,"getProfissional")));
        cloneRiscoEmpregado.setTriagens(
                new TriagemBuilder().cloneList(this.getValue(riscoEmpregado,"getTriagens")));
        
        return cloneRiscoEmpregado;
    }
    
    cloneList(riscoEmpregados: Array<RiscoEmpregado>): Array<RiscoEmpregado> {
        let array:Array<RiscoEmpregado> = new Array<RiscoEmpregado>();
    
        if (riscoEmpregados !== null && riscoEmpregados !== undefined) {    
            for (let riscoEmpregado of riscoEmpregados) {
                array.push(this.clone(riscoEmpregado));
            }
        }
        
        return array;
    }
    
}