import { Component, OnInit, Input } from '@angular/core';
import { FormDataService }            from '../data/formData.service';
import { ItemSelector,Items }            from '../data/formData.model';
@Component({
  selector: 'app-itemselector',
  templateUrl: './itemselector.component.html',
  styleUrls: ['./itemselector.component.css']
})
export class ItemselectorComponent implements OnInit {
  @Input() formData;
  itemselector:ItemSelector;
  selected : string = '';
  total :number=0;
  @Input() items ;
  
  @Input() itemData ;

   constructor(private formDataService: FormDataService) { 
  	this.formDataService.senditems();
    
  }

  ngOnInit() {
       this.formData = this.formDataService.getBoxSelector();
       this.itemselector = this.formDataService.getItemSelector();
       this.itemData = this.formDataService.getItemData();
       this.total = this.formDataService.total;
       this.items = [
        {'id':1,'name':'item1','price':8,'selected':false,'count':0},
        {'id':2,'name':'item2','price':10,'selected':false,'count':0},
        {'id':3,'name':'item3','price':11,'selected':false,'count':0},
        {'id':4,'name':'item4','price':12,'selected':false,'count':0},
        {'id':5,'name':'item5','price':13,'selected':false,'count':0},
        {'id':6,'name':'item6','price':14,'selected':false,'count':0},
        {'id':7,'name':'item7','price':15,'selected':false,'count':0},
        {'id':8,'name':'item8','price':16,'selected':false,'count':0}
    ];

       
  }

  add_to_cart(item: Items) {
    
        this.formDataService.setItemSelector(item);
        this.total = this.formDataService.total;
        this.items.forEach(element => {
           if(element.name == item.name){
            element.selected = true;
            let item1 = this.itemData.item.filter(it => it.name === item.name)[0];
            element.count = item1.count;
            }
        }); 
    }
  remove_to_cart(item: Items) {
  
        this.formDataService.removeItemSelector(item);
        this.total = this.formDataService.total;
        this.items.forEach(element => {
          if(element.name == item.name){
              element.selected = true;
              if(this.itemData.item.some(e => e.name ==item.name)){
              let item2 = this.itemData.item.filter(it => it.name === item.name)[0];
              element.count = item2.count;
              }
              else
              element.count = 0;
              element.selected = (element.count == 0)? false: true;
            }
        }); 
            
    }

}
