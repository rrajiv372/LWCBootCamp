import { LightningElement } from 'lwc';

export default class QuickCreateRefactored extends LightningElement {
    objectApiName = '';
    createTitle = '';

    get options() {
        return [
            { label: 'Account', value: 'Account' },
            { label: 'Opportunity', value: 'Opportunity' },
            { label: 'Contact', value: 'Contact' },
        ];
    }

    handleChange(event) {
        this.objectApiName = event.detail.value;
        this.createTitle = event.detail.value + ' Quick Create';
    }
}