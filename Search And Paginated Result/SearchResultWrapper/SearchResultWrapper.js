import { LightningElement, track, wire, api } from 'lwc';
import getRelatedContacts from '@salesforce/apex/Controller.getRelatedContacts';
import apexActionMethod from '@salesforce/apex/Controller.apexActionMethod';
const columns = [
    {
        label: 'Contact Name',
        fieldName: 'IdUrl',
        sortable: false,
        type: 'url',
        typeAttributes: {
            label: { 
                fieldName: 'Name' 
            },
            target : '_blank'
        }
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        sortable: false
    },
    {
        label: 'Email',
        fieldName: 'Email',
        sortable: false
    }
];

export default class SearchResultWrapper extends LightningElement {
    @api accountId;
    
    @track items;
    @track isLoading = true;
    @track searchByOption = 'Name';
    @track searchStr;
    @track columns;
    @track error;

    get searchByOptions() {
        return [
            { label: 'Account Name', value: 'Name' },
            { label: 'Phone', value: 'Phone' },
        ];
    }

    connectedCallback()
    {
        this.loadContacts();
    }

    handleSearch(event)
    {
        this.searchStr= event.detail.searchStr;
        if(this.searchStr && this.searchStr.length >=3){
            this.searchByOption= event.detail.searchBy;
            this.loadContacts();
        }else {
            this.error = 'Please search with minimum 3 characters.';
        }
    }

    loadContacts()
    {
        this.isLoading = true;
        getRelatedContacts({accountId : this.accountId, searchStr: this.searchStr, searchBy: this.searchByOption})
        .then(result => {
            this.items = result.map((row) => {
                return {
                ...row,
                IdUrl: '/' + row.Id
                };
            });
            
            this.columns = columns;
            this.error = undefined;
            this.isLoading = false;
        })
        .catch(error => {
            this.items = undefined;
            this.handleError(error);
            this.isLoading = false;
        });
    }

    handleUserAction(event) {
        this.selectedIdsArray = event.detail;
        if(this.selectedIdsArray.length == 0)
        {
            event.preventDefault();
            return false;
        }
        
        this.isLoading = true;
        apexActionMethod({selectedContactIds: this.selectedIdsArray })
        .then(result => {
            this.isLoading = false;
            if(document.referrer.indexOf(".lightning.force.com") > 0){
                window.location = '/lightning/r/Account/' + this.leadId + '/view';
            }
            else{
                window.location.href= window.location.origin + '/' + this.leadId;
            }
        })
        .catch(error => { this.handleError(error); this.isLoading = false; })
    }

    handleError(error)
    {
        this.error = 'Something went wrong!';
        if (Array.isArray(error.body)) {
            this.error = error.body.map(e => e.message).join(', ');
        } else if (Array.isArray(error.body.pageErrors)) {
            this.error = error.body.pageErrors.map(e => e.message).join(', ');
        } else if (typeof error.body.message === 'string') {
        this.error = error.body.message;
        }
    }
}