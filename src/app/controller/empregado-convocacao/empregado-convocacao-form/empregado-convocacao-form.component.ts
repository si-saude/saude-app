import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';

import { GlobalVariable } from './../../../global';
import { EmpregadoConvocacao } from './../../../model/empregado-convocacao';
import { EmpregadoConvocacaoService } from './../empregado-convocacao.service';
import { EmpregadoConvocacaoFilter } from './../empregado-convocacao.filter';
import { EmpregadoConvocacaoBuilder } from './../empregado-convocacao.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-empregado-convocacao-form',
    templateUrl: './empregado-convocacao-form.html',
    styleUrls: ['./empregado-convocacao-form.css', './../../../../assets/css/form-component.css']
} )

export class EmpregadoConvocacaoFormComponent extends GenericFormComponent implements OnInit {
    
    empregadoConvocacao: EmpregadoConvocacao;
    
    constructor( private route: ActivatedRoute,
        private empregadoConvocacaoService: EmpregadoConvocacaoService ) {
        super( empregadoConvocacaoService );
        this.goTo = "empregado-convocacao";
        
        this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().initialize( this.empregadoConvocacao );
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
                ( params: any ) => {
                    if ( params['id'] !== undefined ) {
                        let id = params['id'];
                        this.showPreload = true;

                        this.empregadoConvocacaoService.get( id )
                            .then( res => {
                                this.showPreload = false;
                                this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().clone( res.json() );                            
                            } )
                            .catch( error => {
                                this.catchConfiguration( error );
                            } )
                    }
                } );
    }
    
    save() {
        super.save(new EmpregadoConvocacaoBuilder().clone(this.empregadoConvocacao));
    }
}