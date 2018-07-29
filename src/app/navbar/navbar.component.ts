import { Component } from '@angular/core';
import { BoxSelector }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { Router , NavigationEnd} from '@angular/router';

@Component ({
    selector: 'msw-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent  {
  title : "Step 1 of 4 ";
  current_url: any;
  constructor( private router: Router) { 

  
         router.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {
         this.current_url = event.url;
      }
    });
  }
  
    

}

