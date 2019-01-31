export class OrderFilter {
    protected property: string;
    protected desc: boolean;
    
    public getProperty() {
        return this.property;
    }

    public setProperty(property: string) {
        this.property = property;
    }
    
    public getDesc() {
        return this.desc;
    }
    
    public setDesc(desc: boolean) {
        this.desc = desc;
    }    
}