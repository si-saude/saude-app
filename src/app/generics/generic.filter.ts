export abstract class GenericFilter {
    private pageNumber: number;
    private pageSize: number;

    constructor() {
        this.pageNumber = 1;
        this.pageSize = 2;
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