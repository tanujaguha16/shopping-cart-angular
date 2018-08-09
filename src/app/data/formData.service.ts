import { Injectable }                        from '@angular/core';

import { FormData, ItemSelector,Items,BoxSelector}       from './formData.model';
import { WorkflowService }                   from '../workflow/workflow.service';
import { STEPS }                             from '../workflow/workflow.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private item: Items = new Items();
    public total:number = 0;
   

    constructor(private workflowService: WorkflowService) { 
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
    
        this.formData.box = data.box;
        this.formData.price = 8;
        this.formData.quantity = 1;
        this.total = this.total>0?this.total-this.formData.price:this.total;
        this.total = this.total+this.formData.price;
        this.workflowService.validateStep(STEPS.boxselector);
    }
    
    getItemSelector(): ItemSelector {
        var itemselector: ItemSelector = {
            item:  this.formData.item
            
        };
        return itemselector;
    }
     getItemData(): FormData {
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
       
      
   
   
    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
      
       
        return this.formData;
    }

    
}