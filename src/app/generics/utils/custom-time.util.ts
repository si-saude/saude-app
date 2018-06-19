import { DateUtil } from './date.util';

export class CustomTime {
    
    private dateUtil: DateUtil = new DateUtil();
    private apiTime: string;

    constructor(apiTime: Date){
        this.setApiTime(apiTime);
    }

    getApiTime(){
        if( this.apiTime !== null && this.apiTime !== undefined )
            return this.apiTime;
        else return undefined;
    }
    
    setApiTime(date:Date){
        if(date !== null && date !== undefined)
            this.apiTime = this.dateUtil.parseDateToTime(date);
        else return undefined;
    }
}