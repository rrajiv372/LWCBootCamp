import { LightningElement, api, track } from 'lwc';

//Default Page Size
const PAGE_SIZE = '10';

export default class dynamicPaginatedTable extends LightningElement {
    @api columns;
    @api btnLabel;
    sortBy;
    sortDirection;

    //Paginanation
    @track pageNumber = 1; //this will initialize 1st page
    @track startingRecord = 1; //start record position per page
    @track endingRecord = 0; //end record position per page
    @track pageSize = PAGE_SIZE; //default value we are assigning
    @track currentItems;
    @track totalRecordCount;
    @track totalPages;

    selectedIdsArray = [];

    data;
    get items() {
        return this.data;
    }

    @api
    set items(value) {
        this.data = value;
        if(this.data && this.data.length > 0)
        {
            this.totalRecordCount = this.data.length;
            this.totalPages = Math.ceil(this.totalRecordCount / this.pageSize);
            this.displayRecordPerPage();
        }else{
            this.currentItems = undefined;
        }
    }

    get pageSizes() {
        return [
            { label: '10', value: '10' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
            { label: '40', value: '40' },
            { label: '50', value: '50' },
            { label: '100', value: '100' }
        ];
    }

    connectedCallback()
    {
        
    }

    handleBtnClick(event)
    {
        this.selectedIdsArray = [];
        for (const element of this.template.querySelector('lightning-datatable').getSelectedRows())
        {
            this.selectedIdsArray.push(element.Id);
        }

        this.dispatchEvent(new CustomEvent('selectdata', { detail: this.selectedIdsArray }));
    }

    //handle re-render on page size change
    handlePageSizeChange(event)
    {
        this.pageSize = event.target.value;
        this.pageNumber = 1; //reset current page
        this.totalPages = Math.ceil(this.totalRecordCount / this.pageSize);
        this.displayRecordPerPage();
    }

    //cancel to return to previous page
    cancel() {
        window.history.back();
    }

    //clicking on previous button this method will be called
    previousHandler() {
        if (this.pageNumber > 1) {
            this.pageNumber = this.pageNumber - 1; //decrease page by 1
            this.displayRecordPerPage();
        }
    }

    //clicking on next button this method will be called
    nextHandler() {
        if((this.pageNumber < this.totalPages) && this.pageNumber !== this.totalPages){
            this.pageNumber = this.pageNumber + 1; //increase page by 1
            this.displayRecordPerPage();            
        }             
    }
	
	//this method displays records page by page
    displayRecordPerPage(){
        this.startingRecord = ((this.pageNumber -1) * this.pageSize);
        this.endingRecord = (this.pageSize * this.pageNumber);
        this.endingRecord = (this.endingRecord > this.totalRecordCount) ? this.totalRecordCount : this.endingRecord; 
        this.currentItems = this.items && this.data.length > 0 ? this.items.slice(this.startingRecord, this.endingRecord) : undefined;
        this.startingRecord = this.startingRecord + 1;
    }

    handleSortData(event)
    {
        this.sortBy = event.detail.fieldName;
        this.SortDirection = event.detail.sortDirection;
        this.pageNumber = 1; //reset current page
        this.sortData(event.detail.fieldName, event.detail.sortDirection);
    }

    //This sorting logic here is very simple. This will be useful only for text or number field.
    // You will need to implement custom logic for handling different types of field.
    sortData(fieldName, direction) {
        // serialize the data before calling sort function
        let parseData = JSON.parse(JSON.stringify(this.items));

        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldName];
        };

        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1: -1;

        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });

        // set the sorted data to data table data
        this.items = parseData;

    }
}