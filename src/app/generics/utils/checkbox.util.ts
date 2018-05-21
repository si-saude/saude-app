export class CheckboxUtil {
    private htmlElement: HTMLInputElement;
    private value: number = 0;
    
    constructor(input:HTMLInputElement){
        this.htmlElement = input;
        
        this.htmlElement.indeterminate = true;
        this.htmlElement.checked = true;
    }
    
    changeState(){
        if(!this.htmlElement.checked){
            this.value++;
        }
        if(this.value % 2 == 0){
            this.htmlElement.indeterminate = true;
            this.htmlElement.checked = true;
            this.value = 0;
        }
    }
    
    getValue(){
        if(this.htmlElement.indeterminate)
            return 0;
        else if (this.htmlElement.checked)
            return 1;
        else
            return 2;
    }
}