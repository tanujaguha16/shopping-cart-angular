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
       this.items = this.formDataService.allitem();
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
  remove_to_cart(item: Items,type: string = '') {
  
        this.formDataService.removeItemSelector(item,type);
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
