import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import searchAccounts from '@salesforce/apex/LookupComponentHandler.searchAccounts';

export default class LookupComponent extends LightningElement {

    searchStr;
    accDetail;
    accId;
    accName;

    @wire(searchAccounts, {searchStr: '$searchStr'})
    accList;

    isRowClicked = false;

    handleDataSearch(event)
    {
        this.searchStr = event.detail;
        
    }

    handleRowSelection(event)
    {
        this.isRowClicked = true;

        this.accDetail = event.detail.AccountNumber+ ' . ' + event.detail.Type + ' . ' + event.detail.Industry;

        this.accId = event.detail.Id;

        this.accName = event.detail.Name;

    }

    resetSearch()
    {
        this.isRowClicked = false;
        this.accList = []; 
    }
}