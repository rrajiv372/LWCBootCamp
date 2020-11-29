import { LightningElement, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/LookupComponentHandler.getContacts';

export default class ContactDetails extends LightningElement {

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Title', fieldName: 'Title' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Email', fieldName: 'EMail', type: 'Email' },
    ];

    @api
    accDetail;

    @api
    accId;

    @api
    accName;

    @wire( getContacts, { accId : '$accId' } )
    contactList;

    resetSearch()
    {
        this.dispatchEvent(new CustomEvent("resetsearch"));
    }

}