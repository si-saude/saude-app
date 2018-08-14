import { InterfaceDropdown } from './../interfaces/interface.dropdown';
import { GenericReportComponent } from './../generics/generic.report.component';

export class DropdownCheckbox<T> implements InterfaceDropdown<T> {
    private genericReportComponent: GenericReportComponent<T>;

    constructor(genericReportComponent: GenericReportComponent<T>) {
        this.genericReportComponent = genericReportComponent;
    }
    
    dropdown( tipo: string) {
        if ( this.genericReportComponent.arrayObjects.get( tipo ) == undefined )
            this.genericReportComponent.arrayObjects.set( tipo, new Array<any>() );
        
        $( '#dropdown' ).empty();
        
        $( '#dropdown' ).append( 
            "<li id='true' title='" + tipo + "'>" +
            "<input type='checkbox' id=true1>" +
            "<label for='true1'>" + tipo + "</label></li>" );
        let el: HTMLInputElement = <HTMLInputElement>document.getElementById( 'true1' );
        el.indeterminate = true;
        el.checked = true;

        let component = this;
        
        $( "#true1" ).click( function() {
            if ( !el.checked ) {
                component.genericReportComponent.countCheckbox++;
                el.value = 'false';
            } else el.value = 'true';
            if ( component.genericReportComponent.countCheckbox % 2 == 0 ) {
                el.indeterminate = true;
                el.checked = true;
                component.genericReportComponent.countCheckbox = 0;
            }

            component.genericReportComponent.typeFilter = tipo;
            component.genericReportComponent.value = tipo;

            if ( el.indeterminate ) {
                component.genericReportComponent.filter = undefined;
                component.genericReportComponent.arrayObjects.set( tipo, 'indeterminate' );
            } else if ( el.checked ) {
                component.genericReportComponent.filter = true;
                component.genericReportComponent.arrayObjects.set( tipo, 'true' );
            } else {
                component.genericReportComponent.filter = false;
                component.genericReportComponent.arrayObjects.set( tipo, 'false' );
            }
        } );

        if ( this.genericReportComponent.arrayObjects.get( tipo ) == 'indeterminate' ) {
            el.indeterminate = true;
            el.checked = true;
        } else if ( this.genericReportComponent.arrayObjects.get( tipo ) == 'true' ) {
            el.indeterminate = false;
            el.checked = true;
        } else if ( this.genericReportComponent.arrayObjects.get( tipo ) == 'false' ) {
            el.indeterminate = false;
            el.checked = false;
        }
        
        this.showDropdown(tipo);
    }

    showDropdown( tipo ) {
        $( '#dropdown' ).toggleClass( 'show' );
        $( '#dropdown' ).insertAfter( "#" + tipo );
//      $( '#dropdown' ).css( "margin-left", "-" + $( ".list-container" ).scrollLeft() + "px" );

        for ( let t of this.genericReportComponent.arrayTypes ) {
            this.genericReportComponent.arrayObjects.get( t ).forEach( aO => {
                if ( document.getElementById( aO ) != null && document.getElementById( aO ) != undefined ) {
                    document.getElementById( aO ).children.item( 0 ).setAttribute( 'checked', 'true' );
                    document.getElementById( aO ).children.item( 0 ).setAttribute( 'value', 'true' );
                }
            } )
        }
    }
}