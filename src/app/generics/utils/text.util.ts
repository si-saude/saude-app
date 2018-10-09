import { EventEmitter } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";

export class TextUtil {
    private globalActions;
    private toastParams;
    private textLength : number = 20;
    
    constructor() {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
    }

    public showTextToast( text, time = 60000 ) {
        if ( text == "" ) return;

        this.toastParams = [text, time];
        this.globalActions.emit( 'toast' );
    }
    
    public closeTooltip() {
        $( ".toast" ).remove();
    }
    
    public shortText( text: string ) {
        if ( text != undefined && text.length > this.textLength )
            return text.substr(0, this.textLength - 3) + "...";
        else return text;
    }
    public setTextLength(textLength: number){         
        this.textLength = textLength;
    }
    
}
    