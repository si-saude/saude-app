import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { InstalacaoFilter } from './instalacao.filter';
import { IndicadorRiscoAcidenteService } from './../indicador-risco-acidente/indicador-risco-acidente.service';
import { IndicadorRiscoAmbientalService } from './../indicador-risco-ambiental/indicador-risco-ambiental.service';
import { IndicadorRiscoErgonomicoService } from './../indicador-risco-ergonomico/indicador-risco-ergonomico.service';
import { IndicadorRiscoSanitarioService } from './../indicador-risco-sanitario/indicador-risco-sanitario.service';
import { IndicadorRiscoSaudeAmbientalService } from './../indicador-risco-saude-ambiental/indicador-risco-saude-ambiental.service';
import { GenericService } from './../../generics/generic.service';
import { BaseService } from './../base/base.service';
@Injectable()
export class InstalacaoService extends GenericService {
    
    constructor( http: Http, router: Router,
            private baseService: BaseService,
            private indicadorRiscoAcidenteService: IndicadorRiscoAcidenteService,
            private indicadorRiscoAmbientalService: IndicadorRiscoAmbientalService,
            private indicadorRiscoErgonomicoService: IndicadorRiscoErgonomicoService,
            private indicadorRiscoSanitarioService: IndicadorRiscoSanitarioService,
            private indicadorRiscoSaudeAmbientalService: IndicadorRiscoSaudeAmbientalService) { 
        super( http, router, "instalacao" );
    }
    
    getBases() {
        return this.baseService.getBases();
    }
    
    getInstalacoes() {
        return this.selectList(new InstalacaoFilter());
    }
    
    getIndicadoresRiscoAcidente() {
        return this.indicadorRiscoAcidenteService.getIndicadoresRiscoAcidente();
    }
    
    getIndicadoresRiscoAmbiental() {
        return this.indicadorRiscoAmbientalService.getIndicadoresRiscoAmbiental();
    }
    
    getIndicadoresRiscoErgonomico() {
        return this.indicadorRiscoErgonomicoService.getIndicadoresRiscoErgonomico();
    }
    
    getIndicadoresRiscoSanitario() {
        return this.indicadorRiscoSanitarioService.getIndicadoresRiscoSanitario();
    }
    
    getIndicadoresRiscoSaudeAmbiental() {
        return this.indicadorRiscoSaudeAmbientalService.getIndicadoresRiscoSaudeAmbiental();
    }
}