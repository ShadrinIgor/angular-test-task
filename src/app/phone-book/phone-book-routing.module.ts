import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { FormComponent } from './containers/form/form.component';
import { PhoneBookService } from '../services/phone-book.service';

const routing: Route[] = [
  { path: '', component: ListComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'form', component: FormComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routing)
  ],
  exports: [
    RouterModule
  ],
  providers: [PhoneBookService]
})
export class PhoneBookRoutingModule {
}
