import { LightningElement, track, api, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class QuickCreateForm extends NavigationMixin(LightningElement) {
    @api createTitle; //default
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
        //this.showAll = !this.showAll;

        //this.btnVariant = this.showAll ? 'success' : 'neutral';

        // Navigate to the record create page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.objectApiName,
                actionName: 'new',
            },
        });

    }
}