import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { Atestado } from '../../model/atestado';
import { AtestadoFilter } from './atestado.filter';
import { GenericService } from '../../generics/generic.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { CatService } from './../cat/cat.service';
import { DiagnosticoService } from './../diagnostico/diagnostico.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { UsuarioService } from './../usuario/usuario.service';
import { EquipeService } from './../equipe/equipe.service';
import { TarefaService } from './../tarefa/tarefa.service';
import { FeriadoService } from './../feriado/feriado.service';
import { ServicoService } from './../servico/servico.service';
import { MotivoRecusaAtestadoService } from './../motivo-recusa-atestado/motivo-recusa-atestado.service';

@Injectable()
export class AtestadoService extends GenericService {

    constructor( http: Http, router: Router,
            private empregadoService: EmpregadoService,
            private catService: CatService,
            private diagnosticoService: DiagnosticoService,
            private profissionalService: ProfissionalSaudeService,
            private usuarioService: UsuarioService,
            private equipeService: EquipeService,
            private tarefaService: TarefaService,
            private feriadoService: FeriadoService,
            private servicoService: ServicoService,
            private motivoRecusaAtestadoService: MotivoRecusaAtestadoService) { 
        super(http,router,"atestado");
    }
    
    getUsuario( id: number ) {
        return this.usuarioService.get( id );
    }

    getProfissional( profissionalFilter ) {
        return this.profissionalService.list( profissionalFilter );
    }
    
    getAtestados() {
        return this.selectList(new AtestadoFilter());
    }
    
    getStatuses() {
        let urlStatuses = GlobalVariable.BASE_API_URL + "/generic/status-atestado";
        return this.http
            .get( urlStatuses + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getAnexo( id: number ) {
        let urlGetAnexo = this.URL + "/get-atestado";
        return this.http
            .post( urlGetAnexo, id, { headers: this.headers } )
            .toPromise();
    }
    
    getRelatorioMedico( id: number ) {
        let urlGetRelatorioMedico = this.URL + "/get-relatorio-medico";
        return this.http
            .post( urlGetRelatorioMedico, id, { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadoService() {
        return this.empregadoService;
    }
    
    getCatService() {
        return this.catService;
    }
    
    getDiagnosticoService() {
        return this.diagnosticoService;
    }
    
    getProfissionalService() {
        return this.profissionalService;
    }
    
    getListAll(aF) {
        let urlListAll = this.URL + "/list-all";
        return this.http
            .post( urlListAll, aF, { headers: this.headers } )
            .toPromise();
    }
    
    getEquipeService() {
        return this.equipeService;
    }
    
    getTarefaService() {
        return this.tarefaService;
    }
    
    getFeriadoService() {
        return this.feriadoService;
    }
    
    cancelarAgendamento(atestado) {
        let urlCancelarAgendamento = this.URL + "/cancelar-agendamento";
        return this.http
            .post( urlCancelarAgendamento, atestado, { headers: this.headers } )
            .toPromise();
    }
    
    recalcularLimitesDatas(atestado) {
        let urlRecalcularLimites = this.URL + "/recalcular-limites-datas";
        return this.http
            .post( urlRecalcularLimites, atestado, { headers: this.headers } )
            .toPromise();
    }
    
    getServicoService() {
        return this.servicoService;
    }
    
    getMotivoRecusaService( ){
        return this.motivoRecusaAtestadoService;
    }
    
}