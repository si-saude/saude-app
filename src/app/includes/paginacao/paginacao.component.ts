import { Component, OnInit, Input } from '@angular/core';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-paginacao',
    templateUrl: './paginacao.html',
    styleUrls: ['./paginacao.css']
} )
export class PaginacaoComponent {
    @Input() listComponent: any;
    @Input() filter: any;
    @Input() paginasAtuais: any;
    @Input() paginas: any;
    @Input() verifyEmptyPaginas: any;
    
    goToPage( index: number ) {
        this.listComponent.goToPage( index );
    }
    
    activePage( pagina ) {
        return this.listComponent.activePage( pagina );
    }
    
}