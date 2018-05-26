import { Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { SolicitacaoCentralIntegraService } from './../../controller/solicitacao-central-integra/solicitacao-central-integra.service';
import { SolicitacaoCentralIntegraBuilder } from './../../controller/solicitacao-central-integra/solicitacao-central-integra.builder';
import { SolicitacaoCentralIntegra } from './../../model/solicitacao-central-integra';

@Component( {
    selector: 'app-report-solicitacao-central-integra',
    templateUrl: './solicitacao-central-integra.html',
    styleUrls: ['./solicitacao-central-integra.css']
} )
export class SolicitacaoCentralIntegraComponent {
    private solicitacaoCentralIntegras: Array<SolicitacaoCentralIntegra>;
    private filter: string;
    private typeFilter: string;
    private value: string;
    private numberScroll: number;
    private arrayObjects = [[]];
    private arrayTypes: Array<string>;
    protected globalActions;
    protected toastParams;

    constructor( private solicitacaoCentralIntegraService: SolicitacaoCentralIntegraService ) { 
        this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().initializeList(new Array<SolicitacaoCentralIntegra>());
        this.filter = "";
        this.arrayTypes = new Array<string>();
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
    }
    
    ngOnInit() {
        this.solicitacaoCentralIntegraService.getSolicitacoes()
            .then(res => {
                setTimeout(() => {
                    this.solicitacaoCentralIntegras = new SolicitacaoCentralIntegraBuilder().cloneList( res.json() );
                }, 1000);
            })
            .catch(error => {
                console.log("Erro ao pegar panoramas.")
            })
        
        $('#dropdown').mouseleave(function() {
            $('#dropdown').toggleClass('show');
        });
    }
    
    ngAfterViewChecked() {
        $(".container").get(0).style.width = "100%";
    }
    
    selectFilter( event, type: string ) {
        this.filter = event;
        this.typeFilter = type;
        this.value = $('input[name='+type).val();
    }
    
    dropdown( event, tipo ) {
        let arrayDropDown: Array<any> = new Array<any>();
        arrayDropDown = this.getItensDropDown( tipo );
        
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
        $('#dropdown').css("margin-left", "-"+$(".list-container").scrollLeft()+"px");
        
        for ( let t of this.arrayTypes ) {
            this.arrayObjects[t].forEach(aO => {
                if ( document.getElementById(aO) != null && document.getElementById(aO) != undefined ) {
                    document.getElementById(aO).children.item(0).setAttribute('checked', 'true');
                    document.getElementById(aO).children.item(0).setAttribute('value', 'true');
                }
            })
        }
        
    }
    
    selectItemDropDown( item, tipo ) {
        this.typeFilter = tipo;
        this.filter = item;
    }
    
    getItensDropDown( tipo ) {
        let arrayFilter: Array<any> = new Array<any>();
    
        if ( tipo == 'tipoSolicitacao' )
            this.solicitacaoCentralIntegras.forEach(p => {
                if ( arrayFilter.find( a => a == p[tipo]['nome']) == undefined &&
                        p[tipo]['nome'] != "" && p[tipo]['nome'] != undefined ) {
                        arrayFilter.push( p[tipo]['nome'] );
                }
            });
        else this.solicitacaoCentralIntegras.forEach(p => {
                if ( arrayFilter.find( a => a == p[tipo]) == undefined &&
                        p[tipo] != "" && p[tipo] != undefined ) {
                        arrayFilter.push( p[tipo] );
                }
            });
        
        return arrayFilter;
    }
    
    splitDescricao( descricao: string ) {
        if ( descricao.length > 17 )
            return descricao.substring(0, 17)+"...";
        else return descricao;
        
    }
    
    showTextToast( text ) {
        if ( text == "" ) return;
        
        this.toastParams = [text, 60000];
        this.globalActions.emit('toast');
    }
    
    closeTooltip() {
        $(".toast").remove();
    }
    
}