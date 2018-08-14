import { EventEmitter } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";

export class TextUtil {
    private globalActions;
    private toastParams;
    
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
        if ( text != undefined && text.length > 20 )
            return text.substr(0, 17) + "...";
        else return text;
    }
    
}
    