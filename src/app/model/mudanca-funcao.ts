import { Cargo } from './cargo';
import { Funcao } from './funcao';
import { Ghe } from './ghe';
import { Ghee } from './ghee';
import { Regime } from './regime';
import { Gerencia } from './gerencia';
import { Base } from './base';
import { Tarefa } from './tarefa';
import { DateUtil } from './../generics/utils/date.util';
import { CustomDate} from './../generics/utils/custom-date.util';

export class MudancaFuncao {
    private id: number = 0;
    private cargo: Cargo;
    private funcao: Funcao;
    private ghe: Ghe;
    private ghee: Ghee;
    private regime: Regime;
    private gerencia: Gerencia;
    private base: Base;
    private tarefas: Array<Tarefa>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

  
    getCargo() {
        return this.cargo;
    }

    setCargo(cargo: Cargo) {
        this.cargo = cargo;
    }

    setFuncao(funcao: Funcao) {
        this.funcao = funcao;
    }
    getFuncao() {
        return this.funcao;
    }

    setGhe(ghe: Ghe) {
        this.ghe = ghe;
    }
    getGhe() {
        return this.ghe;
    }

    setGhee(ghee: Ghee) {
        this.ghee = ghee;
    }
    getGhee() {
        return this.ghee;
    }

    setRegime(regime: Regime) {
        this.regime = regime;
    }
    getRegime() {
        return this.regime;
    }

    setGerencia(gerencia: Gerencia) {
        this.gerencia = gerencia;
    }
    getGerencia() {
        return this.gerencia;
    }

    getBase() {
        return this.base;
    }

    setBase(base: Base) {
        this.base = base;
    }
    
    getTarefas():Array<Tarefa>{
        return this.tarefas;
    }
    
    setTarefas(tarefas:Array<Tarefa>){
        this.tarefas = tarefas;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }
    
  
}
