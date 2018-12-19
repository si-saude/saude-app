import { OrderFilter } from './order.filter';

export abstract class GenericFilter {
    protected id: number;
    private pageNumber: number;
    private pageSize: number;
    private order:OrderFilter;
    
    constructor() {
        this.pageNumber = 1;
        this.pageSize = 10;
        this.id = 0;
    }
    
    public getId() {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }
    
    public getPageNumber() {
        return this.pageNumber;
    }
    
    public setPageNumber(pN: number) {
        this.pageNumber = pN;
    }
    
    public getPageSize() {
        return this.pageSize;
    }
    
    public setPageSize(pS: number) {
        this.pageSize = pS;
    }
    
    public getOrder() {
        return this.order;
    }
    public setOrder(order: OrderFilter) {
        this.order = order;
    }
}