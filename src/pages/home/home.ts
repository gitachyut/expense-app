import { CategorypopoverComponent } from './../../components/categorypopover/categorypopover';
import { Category } from './../../Classes/Category';
import { OptionpopoverComponent } from './../../components/optionpopover/optionpopover';
import { Expense } from '../../Classes/Expense';
import { Component, Directive } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController, ToastController } from 'ionic-angular';
import { ExpenseComponent } from '../../components/expense/expense';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenseList: Array<Expense>;
  categories: any;
  catIndex: number;
  moveMode: boolean;
  deleteMode: boolean;
  checkArray: Array<boolean>;
  selectedCategoryName: string;
  selectAllOption: boolean;
  // adding newTaskModal Ctrl paramters to constructor
  constructor(public navCtrl: NavController, public newTaskModalCtrl: ModalController, private Params: NavParams
    , public morePopOver: PopoverController, public catPopOver: PopoverController, public toastCtrl: ToastController) {
    this.initalizeAllMembers();
  }
  // to refresh the mainPage after delete category
  ionViewWillEnter() {
    this.initalizeAllMembers();
  }
  initalizeAllMembers() {
    this.categories = Category.getCategories();
    this.catIndex = Category.getSelectedCategory();
    // console.log(' this.catIndex'+ this.catIndex);
    this.selectedCategoryName = this.categories[this.catIndex].title;
    // console.log(JSON.stringify(Category.getSelectedCategory()));
    this.expenseList = this.categories[this.catIndex].expenseList;
    this.checkArray = new Array<boolean>(this.expenseList.length);
    // to get checked item in tasks list 
    this.checkArray.fill(false);
    this.moveMode = this.deleteMode = false;
    this.selectAllOption = false;
  }
  /**
   * 
   * 
   * @param {number} index 
   * 
   * @memberof HomePage
   * @description to delete task in tasks list by it's index
   */
  deleteTask(index: number): void {
    this.expenseList.splice(index, 1);
    let toast = this.toastCtrl.create({
      message: 'One ToDo has been deleted',
      duration: 3000
    });
    toast.present();
  }
  /**
   * 
   * @memberof HomePage
   * @description used to create new modal to add new task
   */
  addTask() {
    // console.log(JSON.stringify(this.Params.get('categories')));
    let taskModal = this.newTaskModalCtrl.create(ExpenseComponent);
    taskModal.onDidDismiss(data => {
      // console.log(JSON.stringify(data));
      if (data != null) {
        // check if the the back task has the same index of this category push this task to this category list
        // if the comming task has index differ than this category then push this task in the category of defined id 
        if (data.index != this.catIndex) {
          this.categories[data.index].expenseList.push(data.task);
        } else {
          this.expenseList.push(data.task);
        }
        let toast = this.toastCtrl.create({
          message: 'One ToDo has been added',
          duration: 3000
        });
        toast.present();
      }

    });
    taskModal.present();
  }
  // view task method
  viewTask(index) {
    let task: Expense = this.expenseList[index];
    let taskModal = this.newTaskModalCtrl.create(ExpenseComponent, { viewTask: task });
    taskModal.onDidDismiss(data => {
      if (data != null) {
        if (data.index != this.catIndex) {
          this.categories[data.index].expenseList.push(data.task);
          this.expenseList.splice(index, 1);
          let toast = this.toastCtrl.create({
            message: 'One ToDo has been moved',
            duration: 3000
          });
          toast.present();
        } else {
          this.expenseList[index] = data.task;
          let toast = this.toastCtrl.create({
            message: 'One ToDo has been saved',
            duration: 3000
          });
          toast.present();
        }
      }
    });
    taskModal.present();
  }

  presentMorePopover($event) {
    // console.log(JSON.stringify(this.categories[this.catIndex]));
    let morePop = this.morePopOver.create(OptionpopoverComponent, { categoryName: this.categories[this.catIndex].title });
    morePop.onDidDismiss(data => {
      if (data != null) {
        // console.log(JSON.stringify(data));
        if (data.move) {
          this.moveMode = true;
          // updating checkArray after add,delete and move
          this.checkArray = new Array<boolean>(this.expenseList.length);
          // to get checked item in tasks list 
          this.checkArray.fill(false);
          // console.log('move mode');
        }
        else if (data.delete) {
          this.deleteMode = true;
          // updating checkArray after add,delete and move
          this.checkArray = new Array<boolean>(this.expenseList.length);
          // to get checked item in tasks list 
          this.checkArray.fill(false);
        }
        else {
          this.categories[this.catIndex].title = data;
          this.selectedCategoryName = this.categories[this.catIndex].title;
          let toast = this.toastCtrl.create({
            message: 'Category name Saved',
            duration: 3000
          });
          toast.present();
        }
      }
    })
    morePop.present({
      ev: event
    });

  }

  // delete one or more tasks
  deleteTasks() {
    // console.log('delete');
    // console.log(this.checkArray.length);
    // for loop to get checked items from tasks list.make it in reverse order for right results 
    // as if i start from 0 to length of array and with slicing array size to 3  (i=5;i>array.length;i++)
    // the for loop will only take half array.which is wrong result 
    for (let i = this.checkArray.length - 1; i >= 0; i--) {
      //  console.log('i'+i+'checked'+this.checkArray[i]);   
      // console.log("this.checkArray.length"+this.checkArray.length); 
      if (this.checkArray[i] == true) {
        this.expenseList.splice(i, 1);
        //after splice item in taskslis the length of expenseList will change and the indecies of item will change too
        // so i splice the checkArray to update the change in length in both arrays to have equal length.
        this.checkArray.splice(i, 1);
      }
    }
    let toast = this.toastCtrl.create({
      message: 'ToDos has been deleted ',
      duration: 3000
    });
    toast.present();
    // set delete Mode to false to back to normal view
    this.deleteMode = false;

  }
  // moving one or more task to new category
  moveTasks() {
    // variable to get the new category index
    let newCatIndex: number = this.catIndex;
    // present category popover
    let popover = this.catPopOver.create(CategorypopoverComponent);
    // get the new index on popover dismiss
    popover.onDidDismiss(data => {
      if (data != null)
        newCatIndex = data;
      //  console.log('dis data'+newCatIndex);
      // for loop to get checked items from tasks list.make it in reverse order for right results 
      // as if i start from 0 to length of array and with slicing array size to 3  (i=5;i>array.length;i++)
      // the for loop will only take half array.which is wrong result 
      for (let i = this.checkArray.length - 1; i >= 0; i--) {
        console.log('i' + i + 'checked' + this.checkArray[i]);
        if (this.checkArray[i] == true) {
          // push the item in the new Category before splice it 
          this.categories[newCatIndex].expenseList.push(this.expenseList[i]);
          //splice the item form the old Category  
          this.expenseList.splice(i, 1);
          //after splice item in taskslis the length of expenseList will change and the indecies of item will change too
          // so i splice the checkArray to update the change in length in both arrays to have equal length.
          this.checkArray.splice(i, 1);
        }
      }
      let toast = this.toastCtrl.create({
        message: 'ToDos has been moved',
        duration: 3000
      });
      toast.present();
      // set moveMode to false to back to normal view
      this.moveMode = false;
    });
    popover.present({
      ev: event
    });


  }

  selectAllCheckBox() {
    if (this.selectAllOption)
      this.checkArray.fill(true);
    else
      this.checkArray.fill(false);
  }

  getItems(ev) {
    this.initalizeAllMembers();
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.expenseList = this.expenseList.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}
