import { ViewChild, Component, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { PanoramaDto } from './../../model/dto/panorama-dto';
import { PanoramaService } from './panorama.service';
import { PanoramaBuilder } from './panorama.builder';
import { HttpUtil } from './../../generics/utils/http.util';

@Component( {
    selector: 'app-panorama',
    templateUrl: './panorama.html',
    styleUrls: ['./panorama.css']
} )
export class PanoramaComponent {
    @ViewChild( "mf" ) data;
    private panoramas: Array<PanoramaDto>;
    private filter: any;
    private typeFilter: string;
    private value: string;
    private numberScroll: number;
    private arrayObjects = [[]];
    private arrayTypes: Array<string>;
    private httpUtil: HttpUtil;
    private globalActions;
    private toastParams;
    private countCheckbox: number = 0;

    constructor( private panoramaService: PanoramaService ) {
        this.panoramas = new PanoramaBuilder().initializeList( new Array<PanoramaDto>() );
        this.filter = "";
        this.arrayTypes = new Array<string>();
        this.httpUtil = new HttpUtil();
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
    }

    ngAfterViewInit() {
        $( ".container" ).get( 0 ).style.width = "100%";

        this.panoramaService.getPanoramas()
            .then( res => {
                this.panoramas = new PanoramaBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( "Erro ao pegar panoramas." )
            } )

        $( '#dropdown' ).mouseleave( function() {
            $( '#dropdown' ).toggleClass( 'show' );
        } );
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

        if ( tipo == "existePendenciaExames" ) {
            let component = this;
            if ( component.arrayObjects['existePendenciaExames'] == undefined )
                component.arrayObjects['existePendenciaExames'] = new Array<any>();

            $( '#dropdown' ).append( "<li id='true' title='existePendenciaExames'>" +
                "<input type='checkbox' id=true1>" +
                "<label for='true1'>Pendencia</label></li>" );
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

                component.typeFilter = "existePendenciaExames";
                component.value = "existePendenciaExames";

                if ( el.indeterminate ) {
                    component.filter = undefined;
                    component.arrayObjects['existePendenciaExames'] = 'indeterminate';
                } else if ( el.checked ) {
                    component.filter = true;
                    component.arrayObjects['existePendenciaExames'] = 'true';
                } else {
                    component.filter = false;
                    component.arrayObjects['existePendenciaExames'] = 'false';
                }
            } );

            $( '#dropdown' ).toggleClass( 'show' );
            $( '#dropdown' ).insertAfter( "#" + tipo );
//            $( '#dropdown' ).css( "margin-left", document.getElementById("id-list-container").scrollLeft + "px" );
            if ( component.arrayObjects['existePendenciaExames'] == 'indeterminate' ) {
                el.indeterminate = true;
                el.checked = true;
            } else if ( component.arrayObjects['existePendenciaExames'] == 'true' ) {
                el.indeterminate = false;
                el.checked = true;
            } else if ( component.arrayObjects['existePendenciaExames'] == 'false' ) {
                el.indeterminate = false;
                el.checked = false;
            }

            return;
        } else {
            let count = 0;
            for ( let item of arrayDropDown ) {
                let el = $( "<li id='" + item + "' title='" + tipo + "'><input type='checkbox' id='" + item + ( ++count ) + "' value='false'>" +
                    "<label for='" + ( item + count ) + "'>" + item + "</label></li>" );
                $( '#dropdown' ).append( el );
                let component = this;

                el.mousedown( function() {
                    if ( $( this ).get( 0 ).children.item( 0 ).getAttribute( 'value' ) == 'false' ) {
                        $( this ).get( 0 ).children.item( 0 ).setAttribute( 'value', 'true' );
                        if ( component.arrayObjects[$( this ).attr( 'title' )] == undefined ) {
                            component.arrayObjects[$( this ).attr( 'title' )] = new Array<any>();
                            component.arrayTypes.push( $( this ).attr( 'title' ) );
                        }
                        component.arrayObjects[$( this ).attr( 'title' )].push( $( this ).attr( 'id' ) );
                    } else {
                        $( this ).get( 0 ).children.item( 0 ).setAttribute( 'value', 'false' );
                        component.arrayObjects[$( this ).attr( 'title' )].splice(
                            component.arrayObjects[$( this ).attr( 'title' )].indexOf( $( this ).attr( 'id' ) ), 1 );
                    }

                    component.filter = this.getAttribute( 'id' );
                    component.typeFilter = this.getAttribute( 'title' );
                    component.value = undefined;

                    setTimeout(() => {
                        component.filter = "";
                        component.typeFilter = "";
                        component.value = "timeout";
                    }, 50 );
                } );

            }

            $( '#dropdown' ).toggleClass( 'show' );
            $( '#dropdown' ).insertAfter( "#" + tipo );
//            $( '#dropdown' ).css( "margin-left", document.getElementById("id-list-container").scrollLeft + "px" );

            for ( let t of this.arrayTypes ) {
                this.arrayObjects[t].forEach( aO => {
                    if ( document.getElementById( aO ) != null && document.getElementById( aO ) != undefined ) {
                        document.getElementById( aO ).children.item( 0 ).setAttribute( 'checked', 'true' );
                        document.getElementById( aO ).children.item( 0 ).setAttribute( 'value', 'true' );
                    }
                } )
            }
        }

    }

    selectItemDropDown( item, tipo ) {
        this.typeFilter = tipo;
        this.filter = item;
    }

    getItensDropDown( tipo ) {
        let arrayFilter: Array<any> = new Array<any>()

        if ( tipo == 'existePendenciaExames' ) {
            arrayFilter = [true, false];
        } else {
            this.panoramas.forEach( p => {
                if ( arrayFilter.find( a => a == p[tipo] ) == undefined &&
                    p[tipo] != "" && p[tipo] != undefined ) {
                    arrayFilter.push( p[tipo] );
                }
            } );
        }

        return arrayFilter;
    }

    exportFile() {
        if ( this.data.data.length > 0 )
            this.panoramaService.exportFile( this.data.data )
                .then( res => {
                    this.httpUtil.downloadFile( res, "panorama.xlsx" );
                } )
                .catch( error => {
                    console.log( error );
                } )
    }

    shortText( text: string ) {
        if ( text != undefined && text.length > 20 )
            return text.substr(0, 17) + "...";
        else return text;
    }
    
    showTextToast( text, time = 60000 ) {
        if ( text == "" ) return;

        this.toastParams = [text, time];
        this.globalActions.emit( 'toast' );
    }

    closeTooltip() {
        $( ".toast" ).remove();
    }

    ngOnDestroy() {
        $( ".toast" ).remove();
        $( ".container" ).get( 0 ).style.width = "70%";
    }

}