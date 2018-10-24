import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GenericService } from './../../generics/generic.service';
import { InterfaceServiceReport } from './../../interfaces/interface.service.report';
import { UsuarioService } from './../../controller/usuario/usuario.service';
import { BaseService } from './../../controller/base/base.service';
import { ProfissionalSaudeService } from './../../controller/profissional-saude/profissional-saude.service';

@Injectable()
export class AcompanhamentoSastReportService extends GenericService implements InterfaceServiceReport {

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private baseService: BaseService,
            private profissionalSaudeService: ProfissionalSaudeService) { 
        super(http, router, "acompanhamento-sast");
    }
    
    getAcompanhamentoByAnoEstadoProfissional(
            anoRisco: number, idProfissional: number, abreviacaoEquipeAcolhimento: string) {
        let urlAcompanhamentoSasts = this.URL + "/get-acompanhamento-sasts";
        return this.http
            .get( urlAcompanhamentoSasts + "?abreviacaoEquipeAcolhimento="+abreviacaoEquipeAcolhimento +
                    "&idProfissional="+idProfissional +
                    "&anoRisco="+anoRisco, { headers: this.headers } )
            .toPromise();
    }
    
    getEntities() {
        let urlAcompanhamentoSasts = this.URL + "/get-acompanhamento-sasts";
        return this.http
            .get( urlAcompanhamentoSasts, { headers: this.headers } )
            .toPromise();
    }
    
    exportFile( array ) {
        let urlFile = this.URL + "/get-file";
        return this.http
            .post( urlFile, array, { headers: this.headers } )
            .toPromise();
    }
    
    getUsuarioService() {
        return this.usuarioService;
    }
    
    getBaseService() {
        return this.baseService;
    }
    
    getProfissionalSaudeService() {
        return this.profissionalSaudeService;
    }
   
}