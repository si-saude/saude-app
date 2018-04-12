import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { RiscoEmpregado } from './../../model/risco-empregado';
import { RiscoEmpregadoFilter } from './risco-empregado.filter';
import { RiscoPotencialFilter } from './../risco-potencial/risco-potencial.filter';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';
import { GenericService } from './../../generics/generic.service';
import { UsuarioService } from './../usuario/usuario.service';
import { RiscoPotencialService } from './../risco-potencial/risco-potencial.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { DiagnosticoService } from './../diagnostico/diagnostico.service';
import { IntervencaoService } from './../intervencao/intervencao.service';
import { EquipeService } from './../equipe/equipe.service';
import { EquipeFilter } from './../equipe/equipe.filter';
import { TriagemService } from './../triagem/triagem.service';
import { TriagemFilter } from './../triagem/triagem.filter';

@Injectable()
export class RiscoEmpregadoService extends GenericService {

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private profissionalService: ProfissionalSaudeService,
            private riscoPotencialService: RiscoPotencialService,
            private diagnosticoService: DiagnosticoService,
            private intervencaoService: IntervencaoService,
            private equipeService: EquipeService,
            private triagemService: TriagemService) {
        super(http,router,"risco-empregado");
    }
    
    getTriagensByEquipeAbordagem( equipeProfissionalId, riscoPotencialId ) {
        let triagemFilter: TriagemFilter = new TriagemFilter();
        triagemFilter.setEquipeAbordagem(new EquipeFilter());
        triagemFilter.setRiscoEmpregado(new RiscoEmpregadoFilter());
        triagemFilter.getRiscoEmpregado().setRiscoPotencial(new RiscoPotencialFilter());
        triagemFilter.setPageSize(Math.pow(2, 31)-1);
        
        triagemFilter.getEquipeAbordagem().setId(equipeProfissionalId);
        triagemFilter.getRiscoEmpregado().getRiscoPotencial().setId(riscoPotencialId);
        
        return this.triagemService.list(triagemFilter);
    }
    
    getPrazos() {
        let urlPrazo = GlobalVariable.BASE_API_URL + "/generic/prazo-em-meses";
        return this.http
            .get( urlPrazo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getByProfissional( riscoPotencialId, profissionalId ) {
        let riscoEmpregadoFilter: RiscoEmpregadoFilter = new RiscoEmpregadoFilter();
        
        riscoEmpregadoFilter.setPageNumber(1);
        riscoEmpregadoFilter.setPageSize(1);
        riscoEmpregadoFilter.setRiscoPotencial( new RiscoPotencialFilter() );
        riscoEmpregadoFilter.setProfissional( new ProfissionalSaudeFilter() );
        riscoEmpregadoFilter.getRiscoPotencial().setId( riscoPotencialId );
        riscoEmpregadoFilter.getProfissional().setId( profissionalId );
        
        return this.list( riscoEmpregadoFilter );
    }
    
    getUsuario( id: number ) {
        return this.usuarioService.get( id );
    }
    
    getProfissional( profissionalFilter ) {
        return this.profissionalService.list( profissionalFilter );
    }
    
    getRiscoPotencial( id ) {
        return this.riscoPotencialService.get(id);
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
    
    getEquipes() {
        return this.equipeService.getEquipes();
    }
    
    listToCopy( riscoEmpregadoFilter ) {
        let urlList = this.URL + "/list-to-copy";
        return this.http
            .post( urlList, riscoEmpregadoFilter, { headers: this.headers } )
            .toPromise();
    }
    
}