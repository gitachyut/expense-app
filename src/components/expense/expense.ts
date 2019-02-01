import { CategorypopoverComponent } from '../categorypopover/categorypopover';
import { Category } from '../../Classes/Category';
import { Expense } from '../../Classes/Expense';
import { Component } from '@angular/core';
import { ViewController, ToastController, NavParams, PopoverController } from 'ionic-angular';

/**
 * Generated class for the newExpenseComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'expense',
  templateUrl: 'expense.html'
})
export class ExpenseComponent {
  // expense variable title,subject 
  title: string;
  subject: string;
  newExpense: Expense;
  // I use the same popover for adding new expense and view existed task
  editMode: boolean;
  viewMode: boolean;
  categories: any;
  catIndex: number;

  constructor(public newExpenseCtrl: ViewController, public toastController: ToastController, public params: NavParams,
    public catPopOver: PopoverController) {
    // in case of add new expense 
    this.title = null;
    this.subject = null;
    this.editMode = true;
    this.viewMode = false;
    // in case of view existed expense
    this.newExpense = params.get('viewTask');
    this.categories = Category.getCategories();
    this.catIndex = Category.getSelectedCategory();

    if (this.newExpense != null) {
      this.title = this.newExpense.title;
      this.subject = this.newExpense.subject;
      this.editMode = false;
      this.viewMode = true;
    }
  }

  closeModal() {
    this.newExpenseCtrl.dismiss(null);

  }
  // saving new expense or edited expense
  saveNewExpense() {
    let date = Date.now();
    if (this.title != null && this.subject != null) {
      this.newExpense = new Expense(this.title, this.subject, new Date(date), 100, "note");
      this.newExpenseCtrl.dismiss({ task: this.newExpense, index: this.catIndex });
    } else if (this.title != null && this.subject == null) {
      this.subject = 'No SUbject';
      this.newExpense = new Expense(this.title, this.subject, new Date(date), 100, "note");
      this.newExpenseCtrl.dismiss({ task: this.newExpense, index: this.catIndex });

    } else if (this.title == null && this.subject != null) {
      this.title = 'No Title';
      this.newExpense = new Expense(this.title, this.subject, new Date(date), 100, "note");
      this.newExpenseCtrl.dismiss({ task: this.newExpense, index: this.catIndex });
    } else
      this.closeModal();
  }
  // changing mode in edit expense
  editExpense() {
    this.editMode = true;
    this.viewMode = false;
  }
  // selecting category for this expense

  addExpenseToCategory(event) {
    let popover = this.catPopOver.create(CategorypopoverComponent);
    popover.onDidDismiss(data => {
      if (data != null)
        this.catIndex = data;
    });
    popover.present({
      ev: event
    });
  }
}
