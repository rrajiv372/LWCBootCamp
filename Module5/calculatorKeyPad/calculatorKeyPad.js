import { LightningElement, api } from 'lwc';

export default class CalculatorKeyPad extends LightningElement {

    @api
    keyItem;

    calculate(event) { 
        let item = event.target.value;
        let custEvent = new CustomEvent('calcpadclick', {detail: item});
        this.dispatchEvent(custEvent);
    }
}