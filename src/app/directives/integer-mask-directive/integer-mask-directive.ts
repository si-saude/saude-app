import {Directive,HostListener,Input,EventEmitter,Output, OnInit, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR,ControlValueAccessor} from '@angular/forms';

@Directive({
    selector: '[integerMaskDirective]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting:IntegerMaskDirective,
        multi: true
    }]
})

export class IntegerMaskDirective implements ControlValueAccessor, OnChanges{
    
    valueLoaded:boolean = false;
    onChange:any;
    onTouched:any;

    @Input('integerMaskDirective') dateMaskDirective: string;
    @Input('ngModel') model: any;
    @Output() ngModelChange = new EventEmitter();
    
    constructor(private el: ElementRef){
    }
    
    ngOnInit() {
        
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if(changes["model"] && changes["model"]["currentValue"] && !this.valueLoaded){
            this.el.nativeElement.value = changes["model"]["currentValue"];
            this.valueLoaded = true;
        }
    }
    
    ngAfterViewInit() {

    }
    
    writeValue(value:any):void{
        
    }
    
    registerOnChange(fn:any):void{
        this.onChange = fn;
    }
    
    registerOnTouched(fn:any):void{
        this.onTouched = fn;
    }
    
    @HostListener('input',['$event'])
    onInput($event:any){
        var valor = $event.target.value.replace(/[^0-9]/g, '');
            $event.target.value = valor;
            this.ngModelChange.emit(valor);
        
    }
    
    @HostListener('blur',['$event'])
    onBlur($event:any){
    }
}