import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AvaliacaoHigieneOcupacional } from './../../model/avaliacao-higiene-ocupacional';
import { AvaliacaoHigieneOcupacionalBuilder } from './../../controller/avaliacao-higiene-ocupacional/avaliacao-higiene-ocupacional.builder';
import { AvaliacaoHigieneOcupacionalService } from './../../controller/avaliacao-higiene-ocupacional/avaliacao-higiene-ocupacional.service';
import { HttpUtil } from './../../generics/utils/http.util';

@Component( {
    selector: 'app-avaliacao-higiene-ocupacional-report',
    templateUrl: './avaliacao-higiene-ocupacional-report.html',
    styleUrls: ['./avaliacao-higiene-ocupacional-report.css', './../../../assets/css/report-component.css']
} )
export class AvaliacaoHigieneOcupacionalReportComponent {
    private avaliacao: AvaliacaoHigieneOcupacional;
    private showModalAvaliacao: boolean;
    private httpUtil: HttpUtil;
    
    constructor(private avaliacaoHigieneOcupacionalService: AvaliacaoHigieneOcupacionalService) { }
    
    ngOnInit() { 
        this.avaliacao = new AvaliacaoHigieneOcupacionalBuilder().initialize(new AvaliacaoHigieneOcupacional());
        this.httpUtil = new HttpUtil();
    }
    
    openModalAvaliacao() {
        this.showModalAvaliacao = true;
    }
    
    selectAvaliacao( avaliacao: AvaliacaoHigieneOcupacional ) {
        this.avaliacao = avaliacao;
        this.showModalAvaliacao = false; 
    }
    
    cancelarModalAvaliacao() {
        this.showModalAvaliacao = false;
    }
    
    downloadAvaliacao() {
        this.avaliacaoHigieneOcupacionalService.downloadRelatorioAvaliacao(new AvaliacaoHigieneOcupacionalBuilder().clone(this.avaliacao))
            .then( res => {
                    this.httpUtil.downloadFile( res, "relatorio-avaliacao.pdf" );
                } )
                .catch( error => {
                    console.log( error );
                } )
    }
}