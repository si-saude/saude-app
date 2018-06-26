import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ServicoService } from './../controller/servico/servico.service';
import { ProfissionalSaudeService } from './../controller/profissional-saude/profissional-saude.service';
import { GenericService } from './../generics/generic.service';

@Injectable()
export class AgendaPeriodicoService extends GenericService {

    constructor( http: Http, router: Router,
            private servicoService: ServicoService) { 
        super( http, router, "agenda-periodico" );
    }
    
    getServicos() {
        return this.servicoService.getServicos();
    }
    
    getAgendaPeriodicos(dataInicioInicio: string, dataInicioFim: string, servicoId: string) {
        let urlAgendaPeriodicos = this.URL + "/get-agenda-periodicos";
        return this.http
            .get( urlAgendaPeriodicos + "?dataInicioInicio=" + dataInicioInicio + 
                    "&dataInicioFim="+ dataInicioFim +
                    "&servicoId=" + servicoId, 
                    { headers: this.headers } )
            .toPromise();
    }
    
    
}