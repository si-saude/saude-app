import * as $ from 'jquery';

export class CssUtil {
    
    public overflowTextarea( element ) {
        $(element).css("overflow-y", "auto");
    }
    
}