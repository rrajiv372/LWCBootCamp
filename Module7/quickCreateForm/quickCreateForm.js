import { LightningElement, track, api, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QuickCreateForm extends LightningElement {
    @api createTitle = "Account Quick Create"; //default
    @api objectApiName ='Account'; //default
    @api recordId;

    @track objectInfo;

    showAll = false;
    showAllBtn = 'Show all fields';
    btnVariant = 'neutral';


    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    objectInfo;
    
    get fields()
    {
        return this.objectInfo.data && this.objectInfo.data.fields ? Object.values(this.objectInfo.data.fields) : null;
    }

    handleSuccess(event) {
        

        const evt = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);

        //event.detail.id = null;
    }

    handleShowAll(event)
    {
        this.showAll = !this.showAll;

        this.btnVariant = this.showAll ? 'success' : 'neutral';
    }
}