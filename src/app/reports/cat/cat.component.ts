import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { CatDto } from './../../model/dto/cat-dto';
import { CatService } from './cat.service';
import { CatBuilder } from './cat.builder';
import { GenericListComponent } from './../../generics/generic.list.component';
import { CatGuard } from './../../guards/guards-child/cat.guard';
import { HttpUtil } from './../../generics/utils/http.util';

@Component( {
    selector: 'app-cat-report',
    templateUrl: './cat.html',
    styleUrls: ['./cat.css']
} )
export class CatComponent {
    @ViewChild( "mf" ) data;
    private cats: Array<CatDto>;
    private globalActions;
    private toastParams;
    private filter: any;
    private typeFilter: string;
    private value: string;
    private arrayObjects = new Map();
    private arrayTypes: Array<string>;
    private httpUtil: HttpUtil;
    private countCheckbox: number = 0;

    constructor(private catService: CatService) {
        this.cats = new CatBuilder().initializeList(this.cats);
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.filter = "";
        this.arrayTypes = new Array<string>();
        this.httpUtil = new HttpUtil();
    }
    
    ngOnInit() {
        $( ".container" ).get( 0 ).style.width = "100%";
        
        $('#dropdown').mouseleave(function() {
            $('#dropdown').toggleClass('show');
        });
        
        this.getCats();
    }
    
    getCats() {
        this.catService.getCats()
            .then( res => {
                this.cats = new CatBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( "Erro ao buscar as cats." );
            } )
    }
    
    selectFilter( event, type: string ) {
        this.filter = event.target.value;
        this.typeFilter = type;
        this.value = type;
    }
    
    dropdown( event, tipo ) {
        let arrayDropDown: Array<any> = new Array<any>();
        arrayDropDown = this.getItensDropDown( tipo );
        $( "#dropdown" ).empty();

        if ( tipo == "contratado" || tipo == "registoSd2000" || tipo == "catSd2000" ||
                tipo == "comunicavelSus" || tipo == "ferimentoGraveConformeAnp") {
            let component = this;
            if ( component.arrayObjects.get(tipo) == undefined )
                component.arrayObjects.set(tipo, new Array<any>());
            
            $( '#dropdown' ).append( "<li id='true' title='"+tipo+"'>" +
                "<input type='checkbox' id=true1>" +
                "<label for='true1'>"+tipo+"</label></li>" );
            let el: HTMLInputElement = <HTMLInputElement>document.getElementById( 'true1' );
            el.indeterminate = true;
            el.checked = true;

            $( "#true1" ).click( function() {
                if ( !el.checked ) {
                    component.countCheckbox++;
                    el.value = 'false';
                } else el.value = 'true';
                if ( component.countCheckbox % 2 == 0 ) {
                    el.indeterminate = true;
                    el.checked = true;
                    component.countCheckbox = 0;
                }
                
                component.typeFilter = tipo;
                component.value = tipo;
                
                if ( el.indeterminate ) {
                    component.filter = undefined;
                    component.arrayObjects.set(tipo, 'indeterminate');
                } else if ( el.checked ) {
                    component.filter = true;
                    component.arrayObjects.set(tipo, 'true');
                } else {
                    component.filter = false;
                    component.arrayObjects.set(tipo, 'false');
                }
            } );

            $( '#dropdown' ).toggleClass( 'show' );
            $( '#dropdown' ).insertAfter( "#" + tipo );
            $( '#dropdown' ).css( "margin-left", "-" + $( ".list-container" ).scrollLeft() + "px" );
            
            if ( component.arrayObjects.get(tipo) == 'indeterminate' ) {
                el.indeterminate = true;
                el.checked = true;
            } else if ( component.arrayObjects.get(tipo) == 'true' ) {
                el.indeterminate = false;
                el.checked = true;            
            } else if ( component.arrayObjects.get(tipo) == 'false' ) {
                el.indeterminate = false;
                el.checked = false;
            }

            return;
        } else {
            let count = 0;
            let el: any;
            for ( let item of arrayDropDown ) {
                el = $( "<li id='" + item + "' title='" + tipo + "'>" +
                    "<input type='checkbox' id='" + item + ( ++count ) + "' value='false'>" +
                    "<label for='" + ( item + count ) + "'>" + item + "</label></li>" );
                $( '#dropdown' ).append( el );

                let component = this;

                el.mousedown(function() {
                    
                    if ( $(this).get(0).children.item(0).getAttribute('value') == 'false') {
                        $(this).get(0).children.item(0).setAttribute('value', 'true');
                        if ( component.arrayObjects.get($(this).attr('title')) == undefined ) {
                            component.arrayObjects.set($(this).attr('title'),new Array<any>());
                            component.arrayTypes.push($(this).attr('title'));
                        }
                        component.arrayObjects.get($(this).attr('title')).push($(this).attr('id'));
                    } else {
                        $(this).get(0).children.item(0).setAttribute('value', 'false');
                        component.arrayObjects.get($(this).attr('title')).splice( 
                                component.arrayObjects.get($(this).attr('title')).indexOf($(this).attr('id')), 1);
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

            $( '#dropdown' ).toggleClass( 'show' );
            $( '#dropdown' ).insertAfter( "#" + tipo );
            $( '#dropdown' ).css( "margin-left", "-" + $( ".list-container" ).scrollLeft() + "px" );

            for ( let t of this.arrayTypes ) {
                this.arrayObjects.get(t).forEach( aO => {
                    if ( document.getElementById( aO ) != null && document.getElementById( aO ) != undefined ) {
                        document.getElementById( aO ).children.item( 0 ).setAttribute( 'checked', 'true' );
                        document.getElementById( aO ).children.item( 0 ).setAttribute( 'value', 'true' );
                    }
                } )
            }
        }

    }
    
    getItensDropDown( tipo ) {
        let arrayFilter: Array<any> = new Array<any>()
        
        this.cats.forEach(p => {
            if ( arrayFilter.find(a => a == p[tipo]) == undefined &&
                    p[tipo] != "" && 
                    p[tipo] != undefined ) {
                    arrayFilter.push( p[tipo] );
            }
        });
        return arrayFilter;
    }
    
    exportFile() {
        if ( this.data.data.length > 0 )
            this.catService.exportFile( this.data.data )
                .then(res => {
                    this.httpUtil.downloadFile(res, "cats.xlsx");
                })
                .catch(error => {
                    console.log(error);
                })
    }
    
}