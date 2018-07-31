import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { AvaliacaoHigieneOcupacional } from './../../../model/avaliacao-higiene-ocupacional';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AvaliacaoHigieneOcupacionalBuilder } from './../avaliacao-higiene-ocupacional.builder';
import { AvaliacaoHigieneOcupacionalService } from './../avaliacao-higiene-ocupacional.service';
import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { EmpregadoFilter } from './../../empregado/empregado.filter';
import { PessoaFilter } from './../../pessoa/pessoa.filter';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';

@Component( {
    selector: 'app-avaliacao-higiene-ocupacional-form',
    templateUrl: './avaliacao-higiene-ocupacional-form.html',
    styleUrls: ['./avaliacao-higiene-ocupacional-form.css', './../../../../assets/css/form-component.css']
} )
export class AvaliacaoHigieneOcupacionalFormDetailComponent extends GenericFormComponent implements OnInit {
    private avaliacaoHigieneOcupacional: AvaliacaoHigieneOcupacional;
    
    constructor( private route: ActivatedRoute,
        private avaliacaoHigieneOcupacionalService: AvaliacaoHigieneOcupacionalService,
        router: Router) {
        super( avaliacaoHigieneOcupacionalService, router );

        this.goTo = "avaliacao-higiene-ocupacional";
        this.avaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacionalBuilder().initialize( this.avaliacaoHigieneOcupacional );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.avaliacaoHigieneOcupacionalService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.avaliacaoHigieneOcupacional = new AvaliacaoHigieneOcupacionalBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } 
            } );
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
//        super.save( new AvaliacaoHigieneOcupacionalBuilder().clone( this.avaliacaoHigieneOcupacional ) );
    }
}