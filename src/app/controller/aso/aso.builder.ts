import { Aso } from './../../model/aso';
import { Atendimento } from './../../model/atendimento';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../usuario/usuario.builder';
import { AsoAlteracao } from './../../model/aso-alteracao';
import { AsoAlteracaoBuilder } from './../aso-alteracao/aso-alteracao.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class AsoBuilder extends GenericBuilder {
    
    initialize(aso: Aso) {
        aso = new Aso();
        
        aso.setAtendimento(new Atendimento());
        aso.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        aso.setUsuario(new UsuarioBuilder().initialize(new Usuario()));
        aso.setAsoAlteracoes(new AsoAlteracaoBuilder().initializeList(new Array<AsoAlteracao>()));
        
        return aso;
    }
    
    initializeList(asos: Array<Aso>) {
        
        let array:Array<Aso> = new Array<Aso>();
        
        if(asos === null || asos === undefined)
            asos = new Array<Aso>();
        
        for (let aso of asos) {
            array.push(this.initialize(aso));
        }
        
        return array;
    }
    
    clone(aso: Aso): Aso {
        
        if (aso === null || aso === undefined)
            aso = new Aso();
        
        let cloneAso = new Aso();
        cloneAso.setId(this.getValue(aso,"getId"));
        cloneAso.setVersion(this.getValue(aso,"getVersion"));
        cloneAso.setData(this.getValue(aso,"getData"));
        cloneAso.setStatus(this.getValue(aso,"getStatus"));
        cloneAso.setConforme(this.getValue(aso,"getConforme"));
        cloneAso.setNaoConformidades(this.getValue(aso,"getNaoConformidades"));
        cloneAso.setValidade(this.getValue(aso,"getValidade"));
        
        if(this.getValue(aso,"getAtendimento") != undefined){
            let atendimento: Atendimento = new Atendimento();
            atendimento.setId(this.getValue(aso,"getAtendimento")["id"]);
            
            cloneAso.setAtendimento(atendimento);            
        }else
            cloneAso.setAtendimento(new Atendimento());
        let atendimento: Atendimento = new Atendimento();

        if ( this.getValue(aso,"getAtendimento") != undefined ) {
            atendimento.setId(this.getValue(aso,"getAtendimento")["id"]);
            cloneAso.setAtendimento(atendimento);
        } else cloneAso.setAtendimento(new Atendimento());
        
        cloneAso.setEmpregado(new EmpregadoBuilder().clone(this.getValue(aso,"getEmpregado")));
        cloneAso.setAsoAlteracoes(new AsoAlteracaoBuilder().cloneList(this.getValue(aso,"getAsoAlteracoes")));
        cloneAso.setUsuario(new UsuarioBuilder().clone(this.getValue(aso,"getUsuario")));
        
        return cloneAso;
    }
    
    cloneList(asos: Array<Aso>): Array<Aso> {
        let array:Array<Aso> = new Array<Aso>();
    
        if (asos !== null && asos !== undefined) { 
            for (let aso of asos) {
                array.push(this.clone(aso));
            }
        }
        
        return array;
    }
    
}