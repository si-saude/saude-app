import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Triagem } from './../../model/triagem';

@Component( {
    selector: 'app-triagem',
    templateUrl: './triagem.html',
    styleUrls: ['./triagem.css']
} )
export class TriagemComponent {
    @Input() triagens: Array<Triagem>;

    constructor() {
        
    }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["triagens"] != undefined ) {
            this.autoPaintTriagem();
        }
    }

    autoPaintTriagem() {
        setTimeout(() => {
            for ( let t = 0; t < this.triagens.length; t++ ) {
                if ( this.triagens[t].getIndice() > -1 ) {
                    this.selectTriagem( t, this.triagens[t].getIndice() )
                }
            }
        }, 300 );
    }

    verifyObrigatoriedadeIndicador( triagem: Triagem ) {
        if ( triagem.getIndicadorSast().getObrigatorio() )
            return "triagem-indicador-bold";

        return "";
    }

    public selectTriagem( indexTriagem, indice ) {
        let i: string = "indice" + indice + "_" + indexTriagem;
        let p: string = "";
        let print: boolean = true;

        if ( $( "td[title=" + i + "]" ).css( "backgroundColor" ) != "transparent" ) {
            print = false;
        }
        for ( let ii = 0; ii <= 4; ii++ ) {
            p = "indice" + ii + "_" + indexTriagem;
            $( "td[title=" + p + "]" ).css( "backgroundColor", "" );
        }
        if ( print ) {
            $( "td[title=" + i + "]" ).css( "backgroundColor", "#D4D4D4" );
            this.triagens[indexTriagem].setIndice( indice );
        } else this.triagens[indexTriagem].setIndice( -1 );
    }

}