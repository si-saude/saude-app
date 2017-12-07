export class BooleanFilter{
    private value: number;

    getValue():number{
        return this.value;
    }
    
    setValue(value:number){
        this.value = value;
    }
}