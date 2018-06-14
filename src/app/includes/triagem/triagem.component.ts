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
export class TriagemComponent{
    @Input() triagens;
    private innerTriagens;
    private triagemIndices: Map<number, number>;

    constructor( router: Router ) {
    }
    
    ngOnInit() { 
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["triagens"] != undefined ) {
            this.innerTriagens = changes["triagens"].currentValue;
            
            setTimeout(() => {
                this.triagemIndices = new Map<number, number>();
                
                for ( let idx = 0; idx < this.innerTriagens.length; idx++ ) {
                    this.triagemIndices.set( idx, this.innerTriagens[idx].getIndice() );
                    if ( this.innerTriagens[idx].getIndice() != -1 ) {
                        let i: string = "indice" + this.triagemIndices.get( idx ) + "_" + idx;
                        $( "td[title=" + i + "]" ).css( "background", "#D4D4D4" );
                    }
                }
            }, 200 );
            
            this.innerTriagens.sort(function(a, b) {
                if ( a.getIndicadorSast().getCodigo() < b.getIndicadorSast().getCodigo() )
                    return -1;
                if ( a.getIndicadorSast().getCodigo() > b.getIndicadorSast().getCodigo() )
                    return 1;
                return 0;
            })
        }
    }
    
    verifyObrigatoriedadeIndicador( triagem: Triagem ) {
        if ( triagem.getIndicadorSast().getObrigatorio() ) 
            return "triagem-indicador-bold";
        
        return "";
    }
    
    selectTriagem( indexTriagem, indice ) {
        let i: string = "indice" + indice + "_" + indexTriagem.toString();

        if ( this.triagemIndices.get( indexTriagem ) != undefined ) {
            if ( this.triagemIndices.get( indexTriagem ) == Number( indice ) ) {
                $( "td[title=" + i + "]" ).css( "background", "" );
                this.innerTriagens[indexTriagem].setIndice( -1 );
                this.triagemIndices.delete( indexTriagem );
                return;
            }
            let iAntigo: string = "indice" + this.triagemIndices.get( indexTriagem ) + "_" + indexTriagem.toString();
            $( "td[title=" + iAntigo + "]" ).css( "background", "" );
        }

        $( "td[title=" + i + "]" ).css( "background", "#D4D4D4" );
        
        this.triagemIndices.set( indexTriagem, Number( indice ) );

        this.innerTriagens[indexTriagem].setIndice( Number( indice ) );
    }
    
}