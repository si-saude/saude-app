import {Directive,HostListener,Input,EventEmitter,Output, OnInit, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR,ControlValueAccessor} from '@angular/forms';
import {DateUtil} from './../../generics/utils/date.util'

@Directive({
    selector: '[timeMaskDirective]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting:TimeMaskDirective,
        multi: true
    }]
})

export class TimeMaskDirective implements ControlValueAccessor, OnChanges{
    
    dateUtil:DateUtil;
    valueLoaded:boolean = false;
    onChange:any;
    onTouched:any;

    @Input('timeMaskDirective') timeMaskDirective: string;
    @Input('ngModel') model: any;
    @Output() ngModelChange = new EventEmitter();
    
    constructor(private el: ElementRef){
        this.dateUtil = new DateUtil();
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
        var valor = $event.target.value.replace(/\D/g, '');
        var pad = this.timeMaskDirective.replace(/\D/g, '').replace(/9/g, '_');
        var valorMask = valor + pad.substring(0, pad.length - valor.length);
     
        if ($event.keyCode === 8) {
          this.onChange(valor);
          return;
        }
     
        if (valor.length <= pad.length) {
          this.onChange(valor);
        }
     
        var valorMaskPos = 0;
        valor = '';
        for (var i = 0; i < this.timeMaskDirective.length; i++) {
          if (isNaN(parseInt(this.timeMaskDirective.charAt(i)))) {
            valor += this.timeMaskDirective.charAt(i);
          } else {
            valor += valorMask[valorMaskPos++];
          }
        }
        
        if (valor.indexOf('_') > -1) {
          valor = valor.substr(0, valor.indexOf('_'));
        }
        
        //VALIDAR VALOR
        if(valor.length == 5){            
            if(this.dateUtil.verifyTimeMask(valor)){
                $event.target.value = valor;
                this.ngModelChange.emit(valor);
            }else{
                $event.target.value = '';
                this.ngModelChange.emit('');
            }
        }else{
            $event.target.value = valor;
            this.ngModelChange.emit(valor);
        }
    }
    
    @HostListener('blur',['$event'])
    onBlur($event:any){
      if ($event.target.value.length === this.timeMaskDirective.length) {
        return;
      }
      this.onChange('');
      $event.target.value = '';
      this.ngModelChange.emit('');
    }
}