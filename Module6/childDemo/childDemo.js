import { LightningElement, api, track } from 'lwc';

export default class ChildDemo extends LightningElement {
    @api
    childTitle;
    @track
    buttonLabel = 'Select';
    variant = 'success';

    handleClick(event)
    {
        this.buttonLabel = event.target.label == 'Select' ? 'Deselect' : 'Select';
        this.variant = event.target.label == 'Select' ? 'destructive' : 'success';

        let childEvnt = new CustomEvent('childbtnclick', {
            bubbles: true,
            composed: true,
            detail : {childTitle: this.childTitle, status: event.target.label}
            
        });

        this.dispatchEvent(childEvnt);
    }
}