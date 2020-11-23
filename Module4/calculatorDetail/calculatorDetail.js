import { LightningElement, api } from 'lwc';

export default class CalculatorDetail extends LightningElement {
    @api
    calcStr = '';

    @api
    result;
}