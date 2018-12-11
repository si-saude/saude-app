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
    
    @Input()  empregado: Empregado;
    @Input()  service;

    constructor( private route: ActivatedRoute, private router: Router ) {
        this.empregado = new EmpregadoBuilder().clone( new Empregado() );
    }

    ngOnInit() {
        
    }
    
    filterItemsOfType(type){
        return this.empregado.getGrupoMonitoramentos().filter(x => x.getTipoGrupoMonitoramento().getId() == type);
    }
    
    getEmpregado(){
        return  this.empregado;
    }
}