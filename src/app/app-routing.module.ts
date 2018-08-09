import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { WorkflowGuard }        from './workflow/workflow-guard.service';
import { WorkflowService }      from './workflow/workflow.service';
import { BoxSelectorComponent } from './box-selector/box-selector.component';
import { ItemselectorComponent } from './itemselector/itemselector.component';

export const appRoutes: Routes = [
   
    { path: 'app-box-selector',  component: BoxSelectorComponent },
    { path: 'itemselector',  component: ItemselectorComponent , canActivate: [WorkflowGuard] },
    { path: '',   redirectTo: '/app-box-selector', pathMatch: 'full' },
    { path: '**', component: BoxSelectorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true} )],
  exports: [RouterModule],
  providers: [WorkflowGuard]
})

export class AppRoutingModule {}