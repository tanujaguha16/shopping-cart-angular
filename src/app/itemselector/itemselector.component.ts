import { Component, OnInit, Input } from '@angular/core';
import { FormDataService }            from '../data/formData.service';
import { ItemSelector }            from '../data/formData.model';
@Component({
  selector: 'app-itemselector',
  templateUrl: './itemselector.component.html',
  styleUrls: ['./itemselector.component.css']
})
export class ItemselectorComponent implements OnInit {
  @Input() formData;
  itemselector:ItemSelector;
  @Input() item_display ;
  constructor(private formDataService: FormDataService) { 
  	this.formDataService.senditems();
  }

  ngOnInit() {
       this.formData = this.formDataService.getBoxSelector();
       this.itemselector = this.formDataService.getItemSelector();
       
  }

  add_to_cart(item: any) {
  
  		this.itemselector.item = item;
        this.formDataService.setItemSelector(this.itemselector);
       
        
    }


}
