import { Component, OnInit } from '@angular/core';
import { Router }              from '@angular/router';

import { BoxSelector }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';

@Component({
  selector: 'app-box-selector',
  templateUrl: './box-selector.component.html',
  styleUrls: ['./box-selector.component.css']
})
export class BoxSelectorComponent implements OnInit {
  title : "Step 1 of 4 ";
  box_selector:BoxSelector;
  form: any;
  constructor(private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
         this.box_selector = this.formDataService.getBoxSelector();
         console.log('BoxSelector feature loaded!')
  }
  
    goToNext(form: any) {
        this.formDataService.setBoxSelector(this.box_selector);
        console.log('nav1' + this.formDataService.boxValid)
        this.router.navigate(['/work']);
    }

}
