import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../../controller/empregado/empregado.builder';

@Component( {
    selector: 'app-informacao-empregado',
    templateUrl: './informacao-empregado.html',
    styleUrls: ['./informacao-empregado.css']
} )
export class InformacaoEmpregadoComponent {

    @Input() idEmpregado;
    @Input() service;
    private empregado: Empregado;

    constructor( private route: ActivatedRoute, private router: Router ) {
        this.empregado = new EmpregadoBuilder().clone( new Empregado() );
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.loadingEmpregado();
    }

    loadingEmpregado() {            
        if ( this.idEmpregado != 0 && this.empregado.getId() == 0 )
             this.service.getEmpregadoService().get( this.idEmpregado )
                .then( res => {
                    this.empregado = new EmpregadoBuilder().clone( res.json() );
                } )
                .catch( error => {
                    console.log( error );
                } )
    }
}