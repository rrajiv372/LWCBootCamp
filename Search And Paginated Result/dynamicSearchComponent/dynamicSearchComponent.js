import { LightningElement, api, track } from 'lwc';

export default class SelectablePaginatedTable extends LightningElement {
    @api showSearchBy;
    @api searchByOption;
    @api searchByOptions;
    @api searchPlaceHolder;

    @track searchStr = '';

    handleKeySearch(event)
    {
        if(event.keyCode === 13)
        {
            this.searchData(event);
        }
    }
    searchData(event)
    {
        this.searchStr = this.template.querySelector('[data-id="searchInput"]').value;

        this.searchByOption = this.template.querySelector('[data-id="searchby"]').value;
        this.dispatchEvent(new CustomEvent('searchdata', { detail: {searchStr: this.searchStr, searchBy: this.searchByOption}}));
    }
}