import { Enfase } from './enfase';
import { Funcao } from './funcao';
import { Ghe } from './ghe';
import { Ghee } from './ghee';
import { Regime } from './regime';
import { Gerencia } from './gerencia';
import { Base } from './base';
import { Profissional } from './profissional';
import { Tarefa } from './tarefa';
import { Instalacao } from './instalacao';
import { DateUtil } from './../generics/utils/date.util';
import { CustomDate} from './../generics/utils/custom-date.util';

export class MudancaFuncao { 
    private id: number = 0;
    private enfase: Enfase;
    private funcao: Funcao;
    private ghe: Ghe;
    private ghee: Ghee;
    private regime: Regime;
    private gerencia: Gerencia;
    private base: Base;
    private abertura: Date;
    private cliente: Profissional;
    private status: string;
    private tarefas: Array<Tarefa>;
    private version: number;
    private atividades : string;
    private instalacoes: Array<Instalacao>;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getAbertura() {
        return this.abertura;
    }

    setAbertura(abertura: Date) {
        this.abertura = abertura;
    }
    
    getStatus():string {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
    }   
    
    getProfissional() {
        return this.cliente;
    }

    setProfissional(cliente: Profissional) {
        this.cliente = cliente;
    }
    
    getEnfase() {
        return this.enfase;
    }

    setEnfase(enfase: Enfase) {
        this.enfase = enfase;
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
    
    getInstalacoes():Array<Instalacao>{
        return this.instalacoes;
    }
    
    setInstalacoes(instalacoes:Array<Instalacao>){
        this.instalacoes = instalacoes;
    }
    
    getTarefas():Array<Tarefa>{
        return this.tarefas;
    }
    
    setTarefas(tarefas:Array<Tarefa>){
        this.tarefas = tarefas;
    }

    getAtividades() {
        return this.atividades;
    }

    setAtividades(atividades: string) {
        this.atividades = atividades;
    }
    
    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }    
  
}
