import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { AvaliacaoHigieneOcupacional } from './../../model/avaliacao-higiene-ocupacional';
import { AvaliacaoHigieneOcupacionalFilter } from './avaliacao-higiene-ocupacional.filter';
import { UsuarioService } from './../usuario/usuario.service';
import { AtendimentoService } from './../atendimento/atendimento.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { LocalizacaoService } from './../localizacao/localizacao.service'
import { EmpregadoService } from './../empregado/empregado.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class AvaliacaoHigieneOcupacionalService extends GenericService {

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private profissionalService: ProfissionalSaudeService,
            private localizacaoService: LocalizacaoService,
            private atendimentoService:AtendimentoService,
            private empregadoService: EmpregadoService ) { 
        super(http,router,"avaliacao-higiene-ocupacional");
    }
    
    getAvaliacaoHigieneOcupacionais() {
        return this.selectList(new AvaliacaoHigieneOcupacionalFilter());
    }
    
    getUsuario( id ) {
        return this.usuarioService.get(id);
    }
    
    getProfissional( profissionalFilter ) {
        return this.profissionalService.list(profissionalFilter);
    }
    
    getLocalizacoes() {
        return this.localizacaoService.getLocalizacoes();
    }
    
    getEnsaioVedacao() {
        let urlEnsaioVedacao =  GlobalVariable.BASE_API_URL + "/generic/ensaio-vedacao";
        return this.http
            .get( urlEnsaioVedacao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    
    getTipoRespiradores() {
        let urlPrazo = GlobalVariable.BASE_API_URL + "/generic/tipo-respirador";
        return this.http
            .get( urlPrazo + "?filter=", { headers: this.headers } )
            .toPromise();
    } 
    
    getTamanhoRespiradores() {
        let urlPrazo = GlobalVariable.BASE_API_URL + "/generic/tamanho-respirador";
        return this.http
            .get( urlPrazo + "?filter=", { headers: this.headers } )
            .toPromise();
    } 
    
    getEmpregadoService() {
        return this.empregadoService;
    }
    
    downloadRelatorioAvaliacao(avaliacaoHigieneOcupacional: AvaliacaoHigieneOcupacional) { 
        let urlDownloadRelatorio =  this.URL + "/download-relatorio";
        return this.http
            .post( urlDownloadRelatorio, avaliacaoHigieneOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    getAvaliacaoAtendimento(id) { 
        let urlAvaliacaoAtendimento =  this.URL + "/get-avaliacao-atendimento";
        return this.http
            .get( urlAvaliacaoAtendimento + "?id=" + id, { headers: this.headers } )
            .toPromise();
    }    
    
    getRelatorioAvaliacaoHo( atendimento ) {
        return this.atendimentoService.getRelatorioAvaliacaoHo(atendimento);
    }
    
    getRelatorioEnsaioVedacao( atendimento ) {
        return this.atendimentoService.getRelatorioEnsaioVedacao(atendimento);
    }
 }