import { LightningElement, api } from 'lwc';

export default class LookupResult extends LightningElement {
    @api
    accName;

    @api
    accDetail;

    accSubDetail;

    connectedCallback()
    {
        this.accSubDetail = this.accDetail.AccountNumber+ ' . ' + this.accDetail.Type + ' . ' + this.accDetail.Industry;
    }

    handleRowClick(event)
    {
        this.dispatchEvent(new CustomEvent('datarowclick', { 
            bubbles:true, 
            composed:true, 
            detail: this.accDetail}));
    }
}