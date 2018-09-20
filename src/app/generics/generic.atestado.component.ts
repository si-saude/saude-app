import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';

import { Atestado } from './../model/atestado';
import { TextUtil } from './utils/text.util';
import { HomologacaoAtestadoComponent } from './../includes/homologacao-atestado/homologacao-atestado.component';
import { AtestadoBuilder } from './../controller/atestado/atestado.builder';
import { SolicitacaoServicoService } from './../solicitacao-servico/solicitacao-servico.service';
import { Util } from './utils/util';

export abstract class GenericAtestadoComponent {
    @ViewChild( HomologacaoAtestadoComponent ) homologacaoAtestado: HomologacaoAtestadoComponent;
    protected atestado: Atestado;
    protected textUtil: TextUtil;
    protected router: Router;

    protected showConfirmSave: boolean;
    protected msgConfirmSave: string;
    protected goTo: string;

    constructor( router: Router, protected solicitacaoServicoService: SolicitacaoServicoService ) {
        this.router = router;
        this.textUtil = new TextUtil();
        this.atestado = new AtestadoBuilder().initialize(new Atestado());
    }
    
    next() {
        if ( !Util.isNotNull(this.homologacaoAtestado.atestado.getInicioCustomDate().getAppDate() ) ) {
            this.textUtil.showTextToast( "Por favor, insira uma data inicial.", 4000 );
            return;
        }
        let canSave = this.homologacaoAtestado.canSave();

        if ( !canSave[0] ) {
            this.textUtil.showTextToast( canSave[1], 4000 );
            return;
        }

        let i: number = 0;
        let total: number = 0;
        let anexo = undefined;
        let anexoRelatorioMedico = undefined;

        if ( this.homologacaoAtestado.inputElAnexo.nativeElement.files.length > 0 ) {
            anexo = this.homologacaoAtestado.inputElAnexo.nativeElement.files[0];
            total++;
        }

        if ( this.homologacaoAtestado.inputElAnexoRelatorioMedico.nativeElement.files.length > 0 ) {
            anexoRelatorioMedico = this.homologacaoAtestado.inputElAnexoRelatorioMedico.nativeElement.files[0];
            total++;
        }

        if ( total > 0 ) {
            let component = this;
            let atestado: Atestado = new AtestadoBuilder().clone( this.homologacaoAtestado.atestado );

            if ( anexo != undefined ) {
                if ( anexo["type"] != "application/pdf" ) {
                    this.textUtil.showTextToast( "O formato do anexo deve ser PDF.", 4000 );
                    return;
                }

                let readerAnexo = new FileReader();

                readerAnexo.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerAnexo.result;
                    let array = new Uint8Array( arrayBuffer );
                    atestado.setAnexo( array );
                    component.callSave( ++i, total, atestado );
                }

                readerAnexo.readAsArrayBuffer( new Blob( [anexo] ) );
            }

            if ( anexoRelatorioMedico != undefined ) {
                if ( anexoRelatorioMedico["type"] != "application/pdf" ) {
                    this.textUtil.showTextToast( "O formato do anexo deve ser PDF.", 4000 );
                    return;
                }

                let readerAnexoRelatorioMedico = new FileReader();

                readerAnexoRelatorioMedico.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerAnexoRelatorioMedico.result;
                    let array = new Uint8Array( arrayBuffer );
                    atestado.setAnexoRelatorioMedico( array );
                    component.callSave( ++i, total, atestado );
                }

                readerAnexoRelatorioMedico.readAsArrayBuffer( new Blob( [anexoRelatorioMedico] ) );
            }

        } else {
            this.salvar( new AtestadoBuilder().clone( this.homologacaoAtestado.atestado ) );
        }

    }

    callSave( i: number, total: number, atestado: Atestado ) {
        if ( i == total ) {
            this.salvar( atestado );
        }
    }

    salvar( atestado: Atestado ) {
        this.solicitacaoServicoService.registrarAtestado( atestado )
            .then( res => {
                this.showConfirmSave = true;
                this.msgConfirmSave = res.text();
                this.goTo = "solicitacao-servico/autenticacao-usuario";
            } )
            .catch( error => {
                this.showConfirmSave = true;
                this.msgConfirmSave = error.text();
                this.goTo = "solicitacao-servico/autenticacao-usuario";
            } )
    }

    back() {
        this.router.navigate( ["/solicitacao-servico/selecao-servico"] );
    }
}