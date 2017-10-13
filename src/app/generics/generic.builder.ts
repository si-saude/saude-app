export abstract class GenericBuilder {
    
    getValue(object:any, method:string):any{
        if(typeof object[method] === 'function')
            return object[method]();
        else{
            let property:string = method.substring(3);
            property = property[0].toLowerCase() + property.substring(1, property.length);
            return object[property];
        }
    }
    
    idGtZero(object:any):boolean{
        if(object !== null && object !== undefined && this.getValue(object,"getId") > 0)
            return true;
        return false;
    }
    
}