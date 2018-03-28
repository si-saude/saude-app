import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Triagem } from './../../model/triagem';
import { TriagemFilter } from './triagem.filter';
import { RiscoEmpregadoFilter } from './../risco-empregado/risco-empregado.filter';
import { RiscoPotencialFilter } from './../risco-potencial/risco-potencial.filter';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';
import { UsuarioService } from './../usuario/usuario.service';
import { RiscoPotencialService } from './../risco-potencial/risco-potencial.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { EquipeFilter } from './../equipe/equipe.filter';
import { DiagnosticoService } from './../diagnostico/diagnostico.service';
import { IntervencaoService } from './../intervencao/intervencao.service';
import { EquipeService } from './../equipe/equipe.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class TriagemService extends GenericService {

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private profissionalService: ProfissionalSaudeService,
            private diagnosticoService: DiagnosticoService,
            private intervencaoService: IntervencaoService,
            private equipeService: EquipeService ) { 
        super( http, router, "triagem" );
    }
    
    getUsuario( id: number ) {
        return this.usuarioService.get( id );
    }
    
    getProfissional( profissionalFilter ) {
        return this.profissionalService.list( profissionalFilter );
    }
    
    getPrazos() {
        let urlPrazo = GlobalVariable.BASE_API_URL + "/generic/prazo-em-meses";
        return this.http
            .get( urlPrazo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getTriagensByEquipeAbordagem( equipeProfissionalId, riscoPotencialId ) {
        let triagemFilter: TriagemFilter = new TriagemFilter();
        triagemFilter.setEquipeAbordagem(new EquipeFilter());
        triagemFilter.setRiscoEmpregado(new RiscoEmpregadoFilter());
        triagemFilter.getRiscoEmpregado().setRiscoPotencial(new RiscoPotencialFilter());
        triagemFilter.setPageSize(Math.pow(2, 31)-1);
        
        triagemFilter.getEquipeAbordagem().setId(equipeProfissionalId);
        triagemFilter.getRiscoEmpregado().getRiscoPotencial().setId(riscoPotencialId);
        
        return this.list(triagemFilter);
    }
    
    getDiagnosticoByDescricaoAndAbreviacao( descricao, abreviacaoEquipe ) {
        return this.diagnosticoService.getDiagnosticoByDescricaoAndAbreviacao(descricao, abreviacaoEquipe);
    }
    
    getDiagnosticoByCodigoAndAbreviacao( codigo, abreviacaoEquipe ) {
        return this.diagnosticoService.getDiagnosticoByCodigoAndAbreviacao(codigo, abreviacaoEquipe);
    }
    
    getIntervencaoByDescricaoAndAbreviacao( descricao, abreviacaoEquipe ) {
        return this.intervencaoService.getIntervencaoByDescricaoAndAbreviacao(descricao, abreviacaoEquipe);
    }
    
    getEquipeAbordagemByName( nome ) {
        return this.equipeService.getEquipeByName(nome);
    }
}