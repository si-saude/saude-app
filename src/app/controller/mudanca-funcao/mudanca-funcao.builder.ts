import { MudancaFuncao } from './../../model/mudanca-funcao';
import { Cargo } from './../../model/cargo';
import { CargoBuilder } from './../cargo/cargo.builder';
import { Funcao } from './../../model/funcao';
import { FuncaoBuilder } from './../funcao/funcao.builder';
import { Ghee } from './../../model/ghee';
import { GheeBuilder } from './../ghee/ghee.builder';
import { Ghe } from './../../model/ghe';
import { GheBuilder } from './../ghe/ghe.builder';
import { Regime } from './../../model/regime';
import { RegimeBuilder } from './../regime/regime.builder';
import { Gerencia } from './../../model/gerencia';
import { GerenciaBuilder } from './../gerencia/gerencia.builder';
import { Base } from './../../model/base';
import { BaseBuilder } from './../base/base.builder';
import { Tarefa } from './../../model/tarefa';
import { TarefaBuilder } from './../tarefa/tarefa.builder';

import { GenericBuilder } from './../../generics/generic.builder';

export class MudancaFuncaoBuilder extends GenericBuilder {
    
    initialize(mudancaFuncao: MudancaFuncao) {
        mudancaFuncao = new MudancaFuncao();
        
        mudancaFuncao.setCargo(new CargoBuilder().initialize(new Cargo()));
        mudancaFuncao.setFuncao(new FuncaoBuilder().initialize(new Funcao()));
        mudancaFuncao.setGhe(new GheBuilder().initialize(new Ghe()));
        mudancaFuncao.setGhee(new GheeBuilder().initialize(new Ghee()));
        mudancaFuncao.setRegime(new RegimeBuilder().initialize(new Regime()));
        mudancaFuncao.setGerencia(new GerenciaBuilder().initialize(new Gerencia()));
        mudancaFuncao.setBase(new BaseBuilder().initialize(new Base()));
        mudancaFuncao.setTarefas(new TarefaBuilder().initializeList(mudancaFuncao.getTarefas()));
        
        return mudancaFuncao;
    }    
    
    clone(mudancaFuncao: MudancaFuncao): MudancaFuncao {
        
        if (mudancaFuncao === null || mudancaFuncao === undefined)
            mudancaFuncao = new MudancaFuncao();
        
        let cloneMudancaFuncao = new MudancaFuncao();
        cloneMudancaFuncao.setId(this.getValue(mudancaFuncao,"getId"));
        cloneMudancaFuncao.setVersion(this.getValue(mudancaFuncao,"getVersion"));  
        cloneMudancaFuncao.setTarefas(new TarefaBuilder().cloneList(this.getValue(mudancaFuncao,"getTarefas")));
        
        if (this.getValue(mudancaFuncao, "getCargo") !== undefined) { 
            cloneMudancaFuncao.setCargo(
                new CargoBuilder().clone(this.getValue(mudancaFuncao,"getCargo")));
            if(!this.idGtZero(cloneMudancaFuncao.getCargo()))
                cloneMudancaFuncao.setCargo(undefined);
        }else{
            cloneMudancaFuncao.setCargo(new CargoBuilder().initialize(null));
        }
        
        if (this.getValue(mudancaFuncao, "getFuncao") !== undefined) { 
            cloneMudancaFuncao.setFuncao(
                new FuncaoBuilder().clone(this.getValue(mudancaFuncao,"getFuncao")));
            if(!this.idGtZero(cloneMudancaFuncao.getFuncao())){                
                cloneMudancaFuncao.setFuncao(undefined);
            }
        }else{
            cloneMudancaFuncao.setFuncao(new FuncaoBuilder().initialize(null));
        }
        if (this.getValue(mudancaFuncao, "getGhe") !== undefined) { 
            cloneMudancaFuncao.setGhe(
                new GheBuilder().clone(this.getValue(mudancaFuncao,"getGhe")));
            if(!this.idGtZero(cloneMudancaFuncao.getGhe())){
                cloneMudancaFuncao.setGhe(undefined);
            }
        }else{
            cloneMudancaFuncao.setGhe(new GheBuilder().initialize(null));
        }
        if (this.getValue(mudancaFuncao, "getGhee") !== undefined) { 
            cloneMudancaFuncao.setGhee(
                new GheeBuilder().clone(this.getValue(mudancaFuncao,"getGhee")));
            if(!this.idGtZero(cloneMudancaFuncao.getGhee()))
                cloneMudancaFuncao.setGhee(undefined);
        }else{
            cloneMudancaFuncao.setGhee(new GheeBuilder().initialize(null));
        }
        if (this.getValue(mudancaFuncao, "getRegime") !== undefined) { 
            cloneMudancaFuncao.setRegime(
                new RegimeBuilder().clone(this.getValue(mudancaFuncao,"getRegime")));
            if(!this.idGtZero(cloneMudancaFuncao.getRegime()))
                cloneMudancaFuncao.setRegime(undefined);
        }else{
            cloneMudancaFuncao.setRegime(new RegimeBuilder().initialize(null));
        }
        if (this.getValue(mudancaFuncao, "getGerencia") !== undefined) { 
            cloneMudancaFuncao.setGerencia(
                new GerenciaBuilder().clone(this.getValue(mudancaFuncao,"getGerencia")));
            if(!this.idGtZero(cloneMudancaFuncao.getGerencia())){
                cloneMudancaFuncao.setGerencia(undefined);               
            }
        }else{
            cloneMudancaFuncao.setGerencia(new GerenciaBuilder().initialize(null));
        }
        if (this.getValue(mudancaFuncao, "getBase") !== undefined) { 
            cloneMudancaFuncao.setBase(
                new BaseBuilder().clone(this.getValue(mudancaFuncao,"getBase")));
            if(!this.idGtZero(cloneMudancaFuncao.getBase())){
                cloneMudancaFuncao.setBase(undefined);                
            }
        }else{
            cloneMudancaFuncao.setBase(new BaseBuilder().initialize(null));
        }
        if (this.getValue(mudancaFuncao, "getTarefas") !== undefined) { 
            cloneMudancaFuncao.setTarefas(new TarefaBuilder().cloneList(this.getValue(mudancaFuncao,"getTarefas")));
        }
        
        return cloneMudancaFuncao;
    }    
    
}