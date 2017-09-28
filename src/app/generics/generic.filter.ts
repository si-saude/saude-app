export abstract class GenericFilter {
    private id: number;
    private pageNumber: number;
    private pageSize: number;

    constructor() {
        this.pageNumber = 1;
        this.pageSize = 2;
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
    
}