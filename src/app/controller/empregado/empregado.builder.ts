import { Empregado } from './../../model/empregado';
import { BaseBuilder } from './../base/base.builder';
import { CargoBuilder } from './../cargo/cargo.builder';
import { EmpregadoVacinaBuilder } from './../empregado-vacina/empregado-vacina.builder';
import { FuncaoBuilder } from './../funcao/funcao.builder';
import { GerenciaBuilder } from '../gerencia/gerencia.builder';
import { GheBuilder } from './../ghe/ghe.builder';
import { GheeBuilder } from './../ghee/ghee.builder';
import { InstalacaoBuilder } from './../instalacao/instalacao.builder';
import { RegimeBuilder } from './../regime/regime.builder';
import { TelefoneBuilder } from './../telefone/telefone.builder';
import { GrupoMonitoramentoBuilder } from './../grupo-monitoramento/grupo-monitoramento.builder';
import { HistoricoGrupoMonitoramentoBuilder } from './../historico-grupo-monitoramento/historico-grupo-monitoramento.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class EmpregadoBuilder extends GenericBuilder{
    
    initialize(empregado: Empregado): Empregado {
        empregado = new Empregado();
        
        empregado.setFuncao(new FuncaoBuilder().initialize(empregado.getFuncao()));
        empregado.setGerencia(new GerenciaBuilder().initialize(empregado.getGerencia()));
        empregado.setBase(new BaseBuilder().initialize(empregado.getBase()));
        empregado.setCargo(new CargoBuilder().initialize(empregado.getCargo()));
        empregado.setGhe(new GheBuilder().initialize(empregado.getGhe()));
        empregado.setGhee(new GheeBuilder().initialize(empregado.getGhee()));
        empregado.setRegime(new RegimeBuilder().initialize(empregado.getRegime()));
        
        empregado.setTelefones(new TelefoneBuilder().initializeList(empregado.getTelefones()));
        empregado.setInstalacoes(new InstalacaoBuilder().initializeList(empregado.getInstalacoes()));
        empregado.setEmpregadoVacinas(new EmpregadoVacinaBuilder().initializeList(empregado.getEmpregadoVacinas()));
        empregado.setGrupoMonitoramentos(new GrupoMonitoramentoBuilder().initializeList(empregado.getGrupoMonitoramentos()));
        empregado.setHistoricoGrupoMonitoramentos(
                new HistoricoGrupoMonitoramentoBuilder().initializeList(empregado.getHistoricoGrupoMonitoramentos()));
        
        return empregado;
    }
    
    clone(empregado: Empregado): Empregado {
        let cloneEmpregado = new Empregado();
        
        if (empregado === null || empregado === undefined)
            empregado = new Empregado();
        
        let status:string = this.getValue(empregado, "getStatus");
        if(status == "")
            status = undefined;
        cloneEmpregado.setStatus(status);
        
        let sexo:string = this.getValue(empregado, "getSexo");
        if(sexo == "")
            sexo = undefined;
        cloneEmpregado.setSexo(sexo);
        
        cloneEmpregado.setId(this.getValue(empregado, "getId"));
        cloneEmpregado.setVersion(this.getValue(empregado, "getVersion"));
        cloneEmpregado.setCpf(this.getValue(empregado, "getCpf"));
        cloneEmpregado.setDataNascimento(this.getValue(empregado, "getDataNascimento"));
        cloneEmpregado.setMatricula(this.getValue(empregado, "getMatricula"));
        cloneEmpregado.setNome(this.getValue(empregado, "getNome"));
        cloneEmpregado.setRamal(this.getValue(empregado, "getRamal"));
        cloneEmpregado.setRg(this.getValue(empregado, "getRg"));
        
        if (this.getValue(empregado, "getBase") !== undefined) { 
            cloneEmpregado.setBase(
                    new BaseBuilder().clone(this.getValue(empregado,"getBase")));
            if(!this.idGtZero(cloneEmpregado.getBase()))
                cloneEmpregado.setBase(undefined);
        } else {
            cloneEmpregado.setBase(new BaseBuilder().initialize(null));
        }
        
        if (this.getValue(empregado, "getCargo") !== undefined) { 
            cloneEmpregado.setCargo(
                    new CargoBuilder().clone(this.getValue(empregado,"getCargo")));
            if(!this.idGtZero(cloneEmpregado.getCargo()))
                cloneEmpregado.setCargo(undefined);
        } else {
            cloneEmpregado.setCargo(new CargoBuilder().initialize(null));
        }
        
        if (this.getValue(empregado, "getFuncao") !== undefined) { 
            cloneEmpregado.setFuncao(
                    new FuncaoBuilder().clone(this.getValue(empregado,"getFuncao")));
            if(!this.idGtZero(cloneEmpregado.getFuncao()))
                cloneEmpregado.setFuncao(undefined);
        } else {
            cloneEmpregado.setFuncao(new FuncaoBuilder().initialize(null));
        }
        
        if (this.getValue(empregado, "getGerencia") !== undefined) { 
            cloneEmpregado.setGerencia(
                    new GerenciaBuilder().clone(this.getValue(empregado,"getGerencia")));
            if(!this.idGtZero(cloneEmpregado.getGerencia()))
                cloneEmpregado.setGerencia(undefined);
        } else {
            cloneEmpregado.setGerencia(new GerenciaBuilder().initialize(null));
        }
        
        if (this.getValue(empregado, "getGhe") !== undefined) { 
            cloneEmpregado.setGhe(
                    new GheBuilder().clone(this.getValue(empregado,"getGhe")));
            if(!this.idGtZero(cloneEmpregado.getGhe()))
                cloneEmpregado.setGhe(undefined);
        } else {
            cloneEmpregado.setGhe(new GheBuilder().initialize(null));
        }
        
        if (this.getValue(empregado, "getGhee") !== undefined) { 
            cloneEmpregado.setGhee(
                    new GheeBuilder().clone(this.getValue(empregado,"getGhee")));
            if(!this.idGtZero(cloneEmpregado.getGhee()))
                cloneEmpregado.setGhee(undefined);
        } else {
            cloneEmpregado.setGhee(new GheeBuilder().initialize(null));
        }
        
        if (this.getValue(empregado, "getRegime") !== undefined) { 
            cloneEmpregado.setRegime(
                    new RegimeBuilder().clone(this.getValue(empregado,"getRegime")));
            if(!this.idGtZero(cloneEmpregado.getRegime()))
                cloneEmpregado.setRegime(undefined);
        } else {
            cloneEmpregado.setRegime(new RegimeBuilder().initialize(null));            
        }
        
        cloneEmpregado.setGrupoMonitoramentos(
                new GrupoMonitoramentoBuilder().cloneList(this.getValue(empregado, "getGrupoMonitoramentos")));
        
        cloneEmpregado.setHistoricoGrupoMonitoramentos(
                new HistoricoGrupoMonitoramentoBuilder().cloneList(this.getValue(empregado, "getHistoricoGrupoMonitoramentos")));
        
        cloneEmpregado.setEmpregadoVacinas(
                new EmpregadoVacinaBuilder().cloneList(this.getValue(empregado, "getEmpregadoVacinas")));
        
        cloneEmpregado.setInstalacoes(
                new InstalacaoBuilder().cloneList(this.getValue(empregado, "getInstalacoes")));
        
        cloneEmpregado.setTelefones(
                new TelefoneBuilder().cloneList(this.getValue(empregado, "getTelefones")));
        
        return cloneEmpregado;
    }
    
    cloneList(empregados: Array<Empregado>): Array<Empregado> {
        let array:Array<Empregado> = new Array<Empregado>();
    
        if (empregados !== null && empregados !== undefined) { 
            for (let empregado of empregados) {
                array.push(this.clone(empregado));
            }
        }
        
        return array;
    }
}