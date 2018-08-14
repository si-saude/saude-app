import { InterfaceDropdown } from './../interfaces/interface.dropdown';
import { GenericReportComponent } from './../generics/generic.report.component';

export class DropdownCommon<T> implements InterfaceDropdown<T> {
    private genericReportComponent: GenericReportComponent<T>;

    constructor(genericReportComponent: GenericReportComponent<T>) {
        this.genericReportComponent = genericReportComponent;
    }
    
    dropdown( tipo: string ) {
        let count = 0;
        let el: any;
        
        $( '#dropdown' ).empty();
        
        for ( let item of this.getItensDropDown( tipo ) ) {
            el = $( 
                "<li id='" + item + "' title='" + tipo + "'>" +
                "<input type='checkbox' id='" + item + ( ++count ) + "' value='false'>" +
                "<label for='" + ( item + count ) + "'>" + item + "</label></li>" );
            $( '#dropdown' ).append( el );

            let component = this;

            el.mousedown( function() {
                if ( $( this ).get( 0 ).children.item( 0 ).getAttribute( 'value' ) == 'false' ) {
                    $( this ).get( 0 ).children.item( 0 ).setAttribute( 'value', 'true' );
                    if ( component.genericReportComponent.arrayObjects.get( $( this ).attr( 'title' ) ) == undefined ) {
                        component.genericReportComponent.arrayObjects.set( $( this ).attr( 'title' ), new Array<any>() );
                        component.genericReportComponent.arrayTypes.push( $( this ).attr( 'title' ) );
                    }
                    component.genericReportComponent.arrayObjects.get( $( this ).attr( 'title' ) ).push( $( this ).attr( 'id' ) );
                } else {
                    $( this ).get( 0 ).children.item( 0 ).setAttribute( 'value', 'false' );
                    component.genericReportComponent.arrayObjects.get( $( this ).attr( 'title' ) ).splice(
                            component.genericReportComponent.arrayObjects.get( $( this ).attr( 'title' ) ).indexOf( $( this ).attr( 'id' ) ), 1 );
                }

                component.genericReportComponent.filter = this.getAttribute( 'id' );
                component.genericReportComponent.typeFilter = this.getAttribute( 'title' );
                component.genericReportComponent.value = undefined;

                setTimeout(() => {
                    component.genericReportComponent.filter = "";
                    component.genericReportComponent.typeFilter = "";
                    component.genericReportComponent.value = "timeout";
                }, 50 );
            } );

        }

        this.showDropdown(tipo);

    }
    
    getItensDropDown( tipo ) {
        let arrayFilter: Array<any> = new Array<any>()

        this.genericReportComponent.entities.forEach( p => {
            if ( arrayFilter.find( a => a == p[tipo] ) == undefined &&
                p[tipo] != "" &&
                p[tipo] != undefined ) {
                arrayFilter.push( p[tipo] );
            }
        } );
        return arrayFilter;
    }


    showDropdown( tipo ) {
        $( '#dropdown' ).toggleClass( 'show' );
        $( '#dropdown' ).insertAfter( "#" + tipo );

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