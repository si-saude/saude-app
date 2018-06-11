import { Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';

import { PanoramaDto } from './../../model/dto/panorama-dto';
import { PanoramaService } from './panorama.service';
import { PanoramaBuilder } from './panorama.builder';

@Component( {
    selector: 'app-panorama',
    templateUrl: './panorama.html',
    styleUrls: ['./panorama.css']
} )
export class PanoramaComponent {
    private panoramas: Array<PanoramaDto>;
    private filter: string;
    private typeFilter: string;
    private value: string;
    private numberScroll: number;
    private arrayObjects = [[]];
    private arrayTypes: Array<string>;

    constructor( private panoramaService: PanoramaService ) { 
        this.panoramas = new PanoramaBuilder().initializeList(new Array<PanoramaDto>());
        this.filter = "";
        this.arrayTypes = new Array<string>();
    }
    
    ngAfterViewInit() {
        $(".container").get(0).style.width = "100%";
        
        this.panoramaService.getPanoramas()
            .then(res => {
                this.panoramas = new PanoramaBuilder().cloneList(res.json());
                this.panoramas.forEach(p => {
                    p.getDataAsoAnoAnteriorString();
                    p.getDataAsoAnoAtualString();
                    p.getDataRealizacaoPreClinicoString();
                })
            })
            .catch(error => {
                console.log("Erro ao pegar panoramas.")
            })
        
        $('#dropdown').mouseleave(function() {
            $('#dropdown').toggleClass('show');
        });
    }
    
    selectFilter( event, type: string ) {
        this.filter = event.target.value;
        this.typeFilter = type;
        this.value = type;
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
                
                component.filter = this.getAttribute('id');
                component.typeFilter = this.getAttribute('title');
                component.value = undefined;
                
                setTimeout(() => {
                    component.filter = "";
                    component.typeFilter = "";
                    component.value = "timeout";
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
        let arrayFilter: Array<any> = new Array<any>()
        
        this.panoramas.forEach(p => {
            if ( arrayFilter.find( a => a == p[tipo]) == undefined &&
                    p[tipo] != "" && p[tipo] != undefined ) {
                    arrayFilter.push( p[tipo] );
            }
        });
        return arrayFilter;
    }
    
}