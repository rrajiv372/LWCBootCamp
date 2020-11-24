import { LightningElement } from 'lwc';

export default class CalculatorMain extends LightningElement {
    //buttonItems = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 'CLR', 0, '=', '/'];
    
    buttonItems =[{key:1, variant:'Neutral'} , {key:2, variant:'Neutral'}, {key:3, variant:'Neutral'}, {key:'+', variant:'brand'},
                {key:4, variant:'Neutral'}, {key:5, variant:'Neutral'}, {key:6, variant:'Neutral'}, {key:'-', variant:'brand'},
                {key:7, variant:'Neutral'}, {key:8, variant:'Neutral'}, {key:9, variant:'Neutral'}, {key:'*', variant:'brand'},
                {key:'CLR', variant:'destructive-text'},{key:0, variant:'Neutral'}, {key:'=', variant:'success'}, {key:'/', variant:'brand'}
            ];

    result = 0;

    calcStr = '';

    handleCalculate(event)
    {
        let item = event.detail;

        if(this.calcStr.endsWith('='))
        {
            this.calcStr = '';
            this.result = 0;
        }
        
        this.calcStr = this.calcStr + item;

        if( typeof item == 'number')
        {
            try{
                this.result = eval(this.calcStr);
            }catch(Exception){
                this.result = "Invalid Expression"; 
                console.log('error ' + this.result);
            }
        }
        else if(item == 'CLR'){
            this.result = 0; 
            this.calcStr = '';
        }
        

        console.log('###### ' +this.result);
    }
}
