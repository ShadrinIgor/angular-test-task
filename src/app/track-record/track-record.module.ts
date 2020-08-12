import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './containers/form/form.component';
import { TrackRecordRoutingModule } from './track-record-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    TrackRecordRoutingModule,
    ReactiveFormsModule
  ]
})
export class TrackRecordModule { }
