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
        var boxselected = JSON.parse(localStorage.getItem("boxselected")); 
        var boxselector: BoxSelector = {
            box: boxselected,
            price: 8 ,
            quantity: 1 ,
            
        };
        
        return boxselector;
    }
    setBoxSelector(data: BoxSelector) {
        this.total = JSON.parse(localStorage.getItem("total"));
        localStorage.setItem("boxselected", JSON.stringify(data.box));
        var boxselected = JSON.parse(localStorage.getItem("boxselected"));
        this.formData.box = boxselected;
        this.formData.price = 8;
        this.formData.quantity = 1;
        this.total = this.total>0?this.total-this.formData.price:this.total;
        this.total = this.total+this.formData.price;
        localStorage.setItem("total", JSON.stringify(this.total)); 
        this.workflowService.validateStep(STEPS.boxselector);
    }
    
    getItemSelector(): ItemSelector {
        var localData = JSON.parse(localStorage.getItem("avct_item")) || [];
        this.formData.item = localData;
        var itemselector: ItemSelector = {
            item:  this.formData.item
            
        };
        return itemselector;
    }
     getItemData(): FormData {
        //localStorage.clear();
        return this.formData;
    }
    
    setItemSelector(data: Items) {
        
        var arr = this.formData.item;
        var localData = JSON.parse(localStorage.getItem("avct_item")) || [];
        let a: Items[];
        var gettotal = JSON.parse(localStorage.getItem("total"));
        gettotal = gettotal + data.price;
        
        if(localData.some(e => e.name ==data.name)){
             localData.forEach(local => {
                  if(local.name == data.name){
                    local.count = local.count+1;
                    local.price = data.price*local.count;
                }
                localStorage.setItem("avct_item", JSON.stringify(localData));
              });
            }
            else{
                a = JSON.parse(localStorage.getItem("avct_item")) || [];
                let myObj = { count: 1, name: ''+data.name, price:data.price };
                a.push(myObj);
                localStorage.setItem("avct_item", JSON.stringify(a)); 
                localData = JSON.parse(localStorage.getItem("avct_item")) || [];
            }
            localStorage.setItem("total", JSON.stringify(gettotal)); 
            this.total = JSON.parse(localStorage.getItem("total"));
            this.formData.item = localData;
           
    }
     removeItemSelector(data: Items) {

        var arr = this.formData.item;
        var localData = JSON.parse(localStorage.getItem("avct_item")) || [];
        let a: Items[];
        var gettotal = JSON.parse(localStorage.getItem("total"));
        gettotal = gettotal - data.price;
        localData.forEach(local => {
            if(local.name == data.name){
                if(local.count >0)
                    local.count = local.count-1;
                local.price = data.price*local.count;
              //  this.total = this.total - data.price;
            }
            if(local.count == 0){
                var index = localData.indexOf(local);
                localData.splice(index, 1);
            }
         });
        localStorage.setItem("total", JSON.stringify(gettotal)); 
        this.total = JSON.parse(localStorage.getItem("total"));
        localStorage.setItem("avct_item", JSON.stringify(localData));
        this.formData.item = localData;
        console.log(localData);
        }
    allitem(){
        let itemsAll =  [
            {'id':1,'name':'item1','price':8,'selected':false,'count':0},
            {'id':2,'name':'item2','price':10,'selected':false,'count':0},
            {'id':3,'name':'item3','price':11,'selected':false,'count':0},
            {'id':4,'name':'item4','price':12,'selected':false,'count':0},
            {'id':5,'name':'item5','price':13,'selected':false,'count':0},
            {'id':6,'name':'item6','price':14,'selected':false,'count':0},
            {'id':7,'name':'item7','price':15,'selected':false,'count':0},
            {'id':8,'name':'item8','price':16,'selected':false,'count':0}
        ];
        itemsAll.forEach(item => {
           this.formData.item.forEach(selecteditem => {
             if(selecteditem.name == item.name){
               item.selected = true;
               item.count = selecteditem.count;
             }
             
              });
            });
        return itemsAll;
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