import { LightningElement } from 'lwc';
import tomLogo from '@salesforce/resourceUrl/tomLogo';
import jerryLogo from '@salesforce/resourceUrl/jerryLogo';

export default class TomAndJerry extends LightningElement {
    
    btnText = "Show Jerry";
    tomLogo = tomLogo;
    jerryLogo = jerryLogo;

    showTom = true;

    changeImages() {
        this.showTom = !this.showTom;
    }
}