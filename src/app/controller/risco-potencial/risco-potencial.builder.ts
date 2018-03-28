import { RiscoPotencial } from './../../model/risco-potencial';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { RiscoEmpregado } from './../../model/risco-empregado';
import { RiscoEmpregadoBuilder } from './../risco-empregado/risco-empregado.builder';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class RiscoPotencialBuilder extends GenericBuilder {
    initialize(riscoPotencial: RiscoPotencial) {
        riscoPotencial = new RiscoPotencial();
        
        riscoPotencial.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        riscoPotencial.setRiscoEmpregados(new RiscoEmpregadoBuilder().initializeList(new Array<RiscoEmpregado>()));
        riscoPotencial.setEquipeResponsavel(new EquipeBuilder().initialize(new Equipe()));
        riscoPotencial.setEquipes(new EquipeBuilder().initializeList(new Array<Equipe>()));
        riscoPotencial.setRiscosInterdiciplinares(new RiscoEmpregadoBuilder().initializeList(new Array<RiscoEmpregado>()));        
        
        return riscoPotencial;
    }
    
    initializeList(riscoPotencials: Array<RiscoPotencial>) {
        
        let array:Array<RiscoPotencial> = new Array<RiscoPotencial>();
        
        if(riscoPotencials === null || riscoPotencials === undefined)
            riscoPotencials = new Array<RiscoPotencial>();
        
        for (let riscoPotencial of riscoPotencials) {
            array.push(this.initialize(riscoPotencial));
        }
        
        return array;
    }
    
    clone(riscoPotencial: RiscoPotencial): RiscoPotencial {
        if (riscoPotencial === null || riscoPotencial === undefined)
            riscoPotencial = new RiscoPotencial();
        
        let cloneRiscoPotencial = new RiscoPotencial();
        cloneRiscoPotencial.setId(this.getValue(riscoPotencial,"getId"));
        cloneRiscoPotencial.setVersion(this.getValue(riscoPotencial,"getVersion"));
        cloneRiscoPotencial.setData(this.getValue(riscoPotencial,"getData"));
        cloneRiscoPotencial.setFimAgendamento(this.getValue(riscoPotencial,"getFimAgendamento"));
        cloneRiscoPotencial.setInicioAgendamento(this.getValue(riscoPotencial,"getInicioAgendamento"));
        cloneRiscoPotencial.setCondutaPercepcao(this.getValue(riscoPotencial,"getCondutaPercepcao"));
        cloneRiscoPotencial.setAtual(this.getValue(riscoPotencial,"getAtual"));
        cloneRiscoPotencial.setStatusRPSat(this.getValue(riscoPotencial,"getStatusRPSat"));
        cloneRiscoPotencial.setStatus(this.getValue(riscoPotencial,"getStatus"));
        cloneRiscoPotencial.setValor(this.getValue(riscoPotencial,"getValor"));
        
        if (this.getValue(riscoPotencial, "getEmpregado") !== undefined) { 
            cloneRiscoPotencial.setEmpregado(
                    new EmpregadoBuilder().clone(this.getValue(riscoPotencial,"getEmpregado")));
        } else {
            cloneRiscoPotencial.setEmpregado(new EmpregadoBuilder().initialize(null));
        }
        
        cloneRiscoPotencial.setRiscoEmpregados(new RiscoEmpregadoBuilder().cloneList(
                this.getValue(riscoPotencial,"getRiscoEmpregados")));
        
        
        if (this.getValue(riscoPotencial, "getEquipeResponsavel") !== undefined) { 
            cloneRiscoPotencial.setEquipeResponsavel(
                    new EquipeBuilder().clone(this.getValue(riscoPotencial,"getEquipeResponsavel")));
            if(!this.idGtZero(cloneRiscoPotencial.getEquipeResponsavel()))
                cloneRiscoPotencial.setEquipeResponsavel(undefined);
        } else {
            cloneRiscoPotencial.setEquipeResponsavel(new EquipeBuilder().initialize(null));
        }
           
        
        cloneRiscoPotencial.setRiscosInterdiciplinares(
                new RiscoEmpregadoBuilder().cloneList(this.getValue(riscoPotencial,"getRiscosInterdiciplinares")));
        
        cloneRiscoPotencial.setEquipes(new EquipeBuilder().cloneList(
                this.getValue(riscoPotencial,"getEquipes")));
        
        return cloneRiscoPotencial;
    }
    
    cloneList(riscoPotencials: Array<RiscoPotencial>): Array<RiscoPotencial> {
        let array:Array<RiscoPotencial> = new Array<RiscoPotencial>();
    
        if (riscoPotencials !== null && riscoPotencials !== undefined) {    
            for (let riscoPotencial of riscoPotencials) {
                array.push(this.clone(riscoPotencial));
            }
        }
        
        return array;
    }
    
}