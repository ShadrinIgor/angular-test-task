import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './containers/list/list.component';
import { FormComponent } from './containers/form/form.component';
import { PhoneBookRoutingModule } from './phone-book-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PhoneBookRoutingModule
  ]
})
export class PhoneBookModule { }
