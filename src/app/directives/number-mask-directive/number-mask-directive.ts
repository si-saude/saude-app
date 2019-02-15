import { Directive, HostListener, Input, EventEmitter, Output, OnInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {Util} from '../../generics/utils/util';

@Directive( {
    selector: '[numberMaskDirective]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: NumberMaskDirective,
        multi: true
    }]
} )

export class NumberMaskDirective implements ControlValueAccessor, OnChanges {
    onChange: any;
    onTouched: any;

    @Input( 'numberMaskDirective' ) numberMaskDirective: string;
    @Input( 'ngModel' ) model: any;
    @Output() ngModelChange = new EventEmitter();

    constructor( private el: ElementRef ) {

    }

    ngOnInit() {        
       if(this.model != undefined)
          this.el.nativeElement.value = this.model;
    }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["model"] && changes["model"]["currentValue"]) {    
            this.el.nativeElement.value = changes["model"]["currentValue"];
        }
    }

    ngAfterViewInit() {
    }

    writeValue( value: any ): void {

    }

    registerOnChange( fn: any ): void {
        this.onChange = fn;
    }

    registerOnTouched( fn: any ): void {
        this.onTouched = fn;
    }

    @HostListener( 'input', ['$event'] )
    onInput( $event: any ) {
        var value = $event.target.value.replace( /\D/g, '' );
        $event.target.value = value;

        if ( value ) {

            if ( $event.keyCode === 8 ) {
                this.onChange( value );
                return;
            }

            value = Util.formatNumber( value );

            $event.target.value = value;
            this.ngModelChange.emit( value );
        }
    }

    @HostListener( 'blur', ['$event'] )
    onBlur( $event: any ) {

    }
}