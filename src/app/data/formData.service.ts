import { Injectable }                        from '@angular/core';

import { FormData, ItemSelector, Address, BoxSelector , Personal,Items}       from './formData.model';
import { WorkflowService }                   from '../workflow/workflow.service';
import { STEPS }                             from '../workflow/workflow.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private item: Items = new Items();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;
    public total:number = 0;
   

    constructor(private workflowService: WorkflowService) { 
    }

    getPersonal(): Personal {
        // Return the Personal data
        var personal: Personal = {
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email
        };
        return personal;
    }
    
    getitems(items){
        this.item.id = items.id;
        this.item.name = items.name;
        this.item.price = items.price;
        //console.log(this.item);
    }
    senditems(){
        this.getitems({'id':1,'name':'ABC','price':'8$'});
        this.getitems({'id':1,'name':'BCD','price':'8$'});
        this.getitems({'id':1,'name':'EFG','price':'8$'});
    }
    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.email = data.email;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
    }
    getBoxSelector(): BoxSelector {
        // Return the Personal data
        var boxselector: BoxSelector = {
            box: this.formData.box,
            price: this.formData.price ,
            quantity: this.formData.quantity ,
            
        };
        
        return boxselector;
    }
    setBoxSelector(data: BoxSelector) {
        // Update the Personal data only when the Personal Form had been validated successfully
      
        this.formData.box = data.box;
        this.formData.price = 8;
        this.formData.quantity = 1;
        this.total = this.total>0?this.total-this.formData.price:this.total;
        this.total = this.total+this.formData.price;
        this.workflowService.validateStep(STEPS.boxselector);
    }
    
    getItemSelector(): ItemSelector {
        // Return the Personal data
        var itemselector: ItemSelector = {
            item:  this.formData.item
            
        };
        
        return itemselector;
    }
     getItemData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }
    
    setItemSelector(data: Items) {
        var arr = this.formData.item;
        //console.log(data.price);
        if(arr.some(e => e.name ==data.name)){
           this.formData.item.forEach(element => {
               if(element.name == data.name){
                element.count = element.count+1;
                element.price = data.price*element.count;
                this.total = this.total + data.price
               
            }
            });  
        }
        else{
        this.formData.item.push({ count: 1, name: ''+data.name, price:data.price });
        this.total = this.total + data.price;
        
        } 
      
    }
     removeItemSelector(data: Items) {

         
        var arr = this.formData.item;
           this.formData.item.forEach(element => {
               if(element.name == data.name){
               if(element.count >0)
                    element.count = element.count-1;
                    element.price = data.price*element.count;
                    this.total = this.total - data.price;
                }
                if(element.count == 0){
                    var index = this.formData.item.indexOf(element);
                    this.formData.item.splice(index, 1);
                }
            });  
        }
       
      
   
    getWork() : string {
        // Return the work type
        return this.formData.work;
    }
    
    setWork(data: string) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        //this.workflowService.validateStep(STEPS.work);
    }

    getAddress() : Address {
        // Return the Address data
        var address: Address = {
            street: this.formData.street,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip
        };
        return address;
    }

    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid && 
                this.isAddressFormValid;
    }
}