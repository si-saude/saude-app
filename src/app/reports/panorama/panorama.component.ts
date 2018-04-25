import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';

import { PanoramaDto } from './../../model/dto/panorama.dto';
import { PanoramaService } from './panorama.service';
import { PanoramaBuilder } from './panorama.builder';

@Component( {
    selector: 'app-panorama',
    templateUrl: './panorama.html',
    styleUrls: ['./panorama.css']
} )
export class PanoramaComponent {
    private panoramas;
    private filter: string;
    private typeFilter: string;
    private arrayFilter = [[]];
    private numberScroll: number;

    constructor( private panoramaService: PanoramaService ) { 
        this.panoramas = new PanoramaBuilder().initializeList(new Array<PanoramaDto>());
        this.filter = "";
    }
    
    ngOnInit() {
        this.panoramaService.getPanoramas()
            .then(res => {
                setTimeout(() => {
                    this.panoramas = new PanoramaBuilder().cloneList(res.json());
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
    }
    
    dropdown( event, tipo ) {
        let arrayDropDown: Array<any> = new Array<any>();
        arrayDropDown = this.getItensDropDown( tipo );
        
        $("#dropdown").empty();
        
        for( let item of arrayDropDown ) {
            let el = $("<li id='"+item+"' title='"+tipo+"'><input type='checkbox' id='"+tipo+"_"+item+"'>" +
                    "<label for='"+item+"'>"+item+"</label></li>");
            $('#dropdown').append(el);
            let component = this;
            el.click( function() {
                component.filter = $(this).attr('id');
                component.typeFilter = $(this).attr('title');
            });
        }
        
        $('#dropdown').toggleClass('show');
        $('#dropdown').insertAfter("#"+tipo);
        $('#dropdown').css("margin-left", "-"+$(".list-container").scrollLeft()+"px");
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