import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { EmpregadosPorGrupoDto } from './../../model/dto/empregados-por-grupo-dto';
import { GrupoMonitoramentoService } from './../../controller/grupo-monitoramento/grupo-monitoramento.service';
import { GrupoMonitoramentoBuilder } from './../../controller/grupo-monitoramento/grupo-monitoramento.builder';
import { EmpregadosPorGrupoService } from './empregados-por-grupo.service';
import { EmpregadosPorGrupoBuilder } from './empregados-por-grupo.builder';
import { GrupoMonitoramentoFilter } from './../../controller/grupo-monitoramento/grupo-monitoramento.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { GrupoMonitoramentoGuard } from './../../guards/guards-child/grupo-monitoramento.guard';

@Component( {
    selector: 'app-empregados-por-grupo-list',
    templateUrl: './empregados-por-grupo.html',
    styleUrls: ['./empregados-por-grupo.css']
} )
export class EmpregadosPorGrupoComponent {
    private empregadosPorGrupo: Array<EmpregadosPorGrupoDto>;
    private grupoMonitoramento: number;
    private gruposMonitoramento: Array<GrupoMonitoramento>;
    private globalActions;
    private toastParams;
    private filter: string;
    private typeFilter: string;
    private value: string;
    private arrayObjects = [[]];
    private arrayTypes: Array<string>;
    
    constructor(private grupoMonitoramentoService: GrupoMonitoramentoService,
            private empregadosPorGrupoService: EmpregadosPorGrupoService) {
        this.empregadosPorGrupo = new EmpregadosPorGrupoBuilder().initializeList(this.empregadosPorGrupo);
        this.grupoMonitoramento = 0;
        this.gruposMonitoramento = new GrupoMonitoramentoBuilder().initializeList(this.gruposMonitoramento);
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.filter = "";
        this.arrayTypes = new Array<string>();
    }
    
    ngOnInit() {
        this.getGruposMonitoramento();
        
        $('#dropdown').mouseleave(function() {
            $('#dropdown').toggleClass('show');
        });
    }
    
    fetchEmpregadosPorGrupo() {
        if ( this.grupoMonitoramento == 0 ) {
            this.toastParams = ['Por favor, selecione o grupo de monitoramento', 5000];
            this.globalActions.emit( 'toast' );
        } else {
            this.empregadosPorGrupoService.getEmpregadosPorGrupo( this.grupoMonitoramento )
                .then(res => {
                    this.empregadosPorGrupo = new EmpregadosPorGrupoBuilder().cloneList(res.json());
                })
                .catch(error => {
                    console.log("Erro ao buscar empregados por grupo monitoramento.");
                })
            this.value = "$*all*$";
            this.arrayObjects = [[]];
            this.arrayTypes = new Array<string>();
        }
    }
    
    getGruposMonitoramento() {
        this.grupoMonitoramentoService.selectList(new GrupoMonitoramentoFilter())
            .then(res => {
                this.gruposMonitoramento = new GrupoMonitoramentoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar grupos monitoramento.");
            })
    }
    
    selectFilter( event, type: string ) {
        this.filter = event;
        this.typeFilter = type;
        this.value = $('input[name='+type).val();
    }
    
    dropdown( event, tipo ) {
        let arrayDropDown: Array<any> = new Array<any>();
        arrayDropDown = this.getItensDropDown( tipo );
        this.value = "";
        
        $("#dropdown").empty();
        let count = 0;
        for( let item of arrayDropDown ) {
          let el = $("<li id='"+item+"' title='"+tipo+"'><input type='checkbox' id='"+ item+(++count) +"' value='false'>" +
                  "<label for='"+(item+count)+"'>"+item+"</label></li>");
            $('#dropdown').append(el);
            let component = this;
            
            el.mousedown(function() {
                if ( $(this).get(0).children.item(0).getAttribute('value') == 'false') {
                    $(this).get(0).children.item(0).setAttribute('value', 'true');
                    if ( component.arrayObjects[$(this).attr('title')] == undefined ) {
                        component.arrayObjects[$(this).attr('title')] = new Array<any>();
                        component.arrayTypes.push($(this).attr('title'));
                    }
                    component.arrayObjects[$(this).attr('title')].push($(this).attr('id'));
                } else {
                    $(this).get(0).children.item(0).setAttribute('value', 'false');
                    component.arrayObjects[$(this).attr('title')].splice( 
                            component.arrayObjects[$(this).attr('title')].indexOf($(this).attr('id')), 1);
                }
                
                component.filter = $(this).attr('id');
                component.typeFilter = $(this).attr('title');
                setTimeout(() => {
                    component.filter = "";
                    component.typeFilter = "";
                }, 50);
            });
                
        }
        
        $('#dropdown').toggleClass('show');
        $('#dropdown').insertAfter("#"+tipo);
        
        for ( let t of this.arrayTypes ) {
            this.arrayObjects[t].forEach(aO => {
                if ( document.getElementById(aO) != null && document.getElementById(aO) != undefined ) {
                    document.getElementById(aO).children.item(0).setAttribute('checked', 'true');
                    document.getElementById(aO).children.item(0).setAttribute('value', 'true');
                }
            })
        }
        
    }
    
    getItensDropDown( tipo ) {
        let arrayFilter: Array<any> = new Array<any>()
        
        this.empregadosPorGrupo.forEach(p => {
            if ( arrayFilter.find(a => a == p[tipo]) == undefined &&
                    p[tipo] != "" && 
                    p[tipo] != undefined ) {
                    arrayFilter.push( p[tipo] );
            }
        });
        return arrayFilter;
    }
    
}