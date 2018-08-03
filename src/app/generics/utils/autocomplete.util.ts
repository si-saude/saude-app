import {GenericService} from './../generic.service';
import {GenericFilter} from './../generic.filter';

export class AutoComplete<F extends GenericFilter> {
    private service:GenericService;
    private objAutoComplete:any;
    private builder:any;
    private filter:F;
    private array:Array<any> = new Array<any>();
    private genericAutoComplete;
    private lastValue = "";
    private lastInfo:string = "";
    
    constructor(filter, genericAutoComplete, service:GenericService,builder:any){
        this.filter = filter;
        this.service = service;
        this.builder = builder;
        this.genericAutoComplete = genericAutoComplete;
    }
    
    public getList(obj, getMethod: string){
        let infos = obj[getMethod]().split('||');
        let info = infos[infos.length - 1].trim();
        
        
        if(this.lastInfo != info){
            
            this.lastInfo = info;
        
            if ( this.lastValue == undefined || info != this.lastValue.trim() ) { 
                this.filter = this.genericAutoComplete.getFilter(obj,this.filter);

                if(typeof this.genericAutoComplete['getList'] === 'function'){
                    this.genericAutoComplete.getList(this.service, this.filter)
                    .then(res => {
                        this.executeAutoComplete(res);
                    }).catch( error => {
                        console.log( error );
                    } );
                }else{
                    this.service.list(this.filter)
                    .then(res => {
                        this.executeAutoComplete(res);
                    }).catch( error => {
                        console.log( error );
                    } );
                }
            }
        }
    }
    
    private executeAutoComplete(res){
        this.array = this.builder.cloneList(res.json().list);
        
        if(this.array.length > 0)
            this.objAutoComplete = [this.buildAutocomplete()];
        else{
            this.objAutoComplete = [{'data': {'': null }}]
        }
    }
    
    public getObj(input,obj,setMethod, getMethod){
        let value = obj[setMethod.replace('set','get')]()[getMethod]();
        
        if(input.target.value != undefined && input.target.value.includes('||')){
            
            let infos = input.target.value.split('||');
            let id = infos[0].trim();
            let info = infos[infos.length - 1].trim();
            this.lastValue = info;
            obj[setMethod]( this.array.find(a => a.getId().toString() == id) );
            
            this.objAutoComplete = [{'data': {'': null }}];
        }else if(this.lastValue != undefined && this.lastValue != value){
            obj[setMethod](this.builder.initialize(undefined));
        }
    }
    
    public initializeLastValue(lastValue){
        if(this.lastValue == undefined){
            this.lastValue = lastValue;  
        }
    }
    
    buildAutocomplete() {
        let data = {};
        this.array.forEach( item => {
            data[item.getId() + ' || ' + this.genericAutoComplete.getLabel(item)] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }
    
    public getFilter(){
        return this.filter;
    }
    
    public setFilter(filter:F){
        this.filter = filter;
    }
    
    public getObjAutoComplete(){
        return this.objAutoComplete;
    }
}