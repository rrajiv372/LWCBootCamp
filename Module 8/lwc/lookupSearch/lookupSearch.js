import { LightningElement } from 'lwc';

export default class LookupSearch extends LightningElement {
    handleSearch(event)
    {
        if(event.target.value.length < 3)
        {
            event.stopPropagation();
            return;
        }

        this.searchData(event.target.value );
    }

    searchData(searchStr)
    {
        console.log(searchStr);

        this.dispatchEvent(new CustomEvent('datasearch', {detail: searchStr}));
    }
}