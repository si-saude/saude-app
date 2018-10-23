import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { Profissional } from './../../model/profissional';
import { AcompanhamentoSastEmpregadoDto } from './../../model/dto/acompanhamento-sast-empregado-dto';
import { AcompanhamentoSastReportService } from './acompanhamento-sast-report.service';
import { AcompanhamentoSastEmpregadoReportBuilder } from './acompanhamento-sast-empregado-report.builder';
import { ProfissionalSaudeFilter } from './../../controller/profissional-saude/profissional-saude.filter';
import { ProfissionalSaudeBuilder } from './../../controller/profissional-saude/profissional-saude.builder';
import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';
import { PessoaFilter } from './../../controller/pessoa/pessoa.filter';
import { GenericReportComponent } from './../../generics/generic.report.component';

@Component( {
    selector: 'app-acompanhamento-sast-report',
    templateUrl: './acompanhamento-sast-report.html',
    styleUrls: ['./acompanhamento-sast-report.css', './../../../assets/css/report-component.css']
} )
export class AcompanhamentoSastReportComponent extends GenericReportComponent<AcompanhamentoSastEmpregadoDto> {
    private ano: number;
    private estado: string;
    private estados: Array<string>;
    private profissional: Profissional;
    private showPreload: boolean;
    
    constructor(private acompanhamentoSastService: AcompanhamentoSastReportService, private router: Router) {
        super( acompanhamentoSastService, new AcompanhamentoSastEmpregadoReportBuilder, "acompanhamento-sast.xlsx");
        this.estado = '';
        this.estados = new Array<string>();
    }
    
    ngOnInit() {
        if ( localStorage.getItem( "usuario-id" ) != undefined ) {
            this.acompanhamentoSastService.getUsuarioService().get( Number( localStorage.getItem( "usuario-id" ) ) )
                .then( res => {
                    if ( res.json()["id"] > 0 && res.json()["pessoa"] != undefined ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.setEmpregado( new EmpregadoFilter() );
                        profissionalFilter.getEmpregado().setPessoa( new PessoaFilter() );
                        profissionalFilter.getEmpregado().getPessoa().setCpf( res.json()["pessoa"]["cpf"] );

                        this.acompanhamentoSastService.getProfissionalSaudeService().list( profissionalFilter )
                            .then( res => {
                                if ( res.json().list[0] != undefined )
                                    this.profissional = new ProfissionalSaudeBuilder().clone( res.json().list[0] );
                                else {
                                    this.router.navigate( ["/login"] );
                                    return;
                                }
                            } )
                            .catch( error => {
                                console.log( "Erro no servidor ao buscar o profissional. Tentar mais tarde."+error );
                            } )
                    } else {
                        this.router.navigate( ["/login"] );
                        return;
                    }
                } )
                .catch( error => {
                    console.log( "Erro no servidor ao buscar o usuario."+error );
                } )
        } else {
            console.log( "Usuario nao logada." );
            this.router.navigate( ["/login"] );
        }
        this.getEstados();
    }
    
    getEstados() {
        this.acompanhamentoSastService.getBaseService().getUfs()
            .then(res => {
                this.estados = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar estados.");
            })
    }
    
    getEntities() {
        if ( this.ano.toString().length != 4 || this.estado == "" ) {
            this.textUtil.showTextToast("Por favor, insira um ano v&aacute;lido", 4000);
        } else if ( this.ano.toString().length == 4 ) {
            let abreviacao;
            if ( this.estado == "BA" ) abreviacao = "ENF";
            else abreviacao = "ACO";
            this.acompanhamentoSastService.getAcompanhamentoByAnoEstadoProfissional(
                    this.ano, this.profissional.getId(), abreviacao)
                .then(res => {
                    this.entities = this.builder.cloneList(res.json());
                    this.filter = "";
                    this.value = "change";
                })
                .catch(error => {
                    console.log("Erro ao buscar entidades."+error);
                })
        }
    }
    
    toggleEquipe( index: string ) {
        $("#"+index).toggle();   
    }
    
    toggleIndicador( index: string ) {
        $("#"+index).toggle();
    }
    
    toggleAcao( index: string ) {
        $("#"+index).toggle();
    }
    
    toggleAcompanhamento(index: string) {
        $("#"+index).toggle();
    }

}