import { LightningElement } from 'lwc';

export default class GrandParentDemo extends LightningElement {

    count = 0;
    
    handleChildClick(event)
    {
        if(event.detail.status == 'Select')
        {
            this.count = this.count + 1;
        }
        else{
            this.count = this.count - 1;
        }
    }
}