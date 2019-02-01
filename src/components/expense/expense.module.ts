import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseComponent } from './expense';

@NgModule({
  declarations: [
    ExpenseComponent,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseComponent),
  ],
  exports: [
    ExpenseComponent
  ]
})
export class NewTaskComponentModule {}
