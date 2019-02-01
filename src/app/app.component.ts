import { ManageCategoryPage } from './../pages/manage-category/manage-category';
import { Category } from './../Classes/Category';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Expense } from '../Classes/Expense';
// import { CategoryService } from 'xpense-api' 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  expenseList: Array<Expense>;
  pages: Array<{ title: string, component: any, expenseList: Array<Expense> }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public alerCategory: AlertController, public toastCtrl: ToastController) {
    this.initializeApp();
    this.expenseList = new Array<Expense>();
    // this.catservice.getAll().subscribe(x => console.log(x))
    for (let i = 0; i < 9; i++) {
      let task = new Expense('E'+i, 'asas', new Date() ,223,'23');
      this.expenseList.push(task);
    }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, expenseList: this.expenseList }
    ];

    // to set array of categories for the first time before click  
    Category.setCategories(this.pages);


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page, _index: number) {
    Category.setCategories(this.pages);
    Category.setSelectedCategory(_index);
    this.nav.setRoot(page.component);
  }
  addCategory() {
    let categoryPrompt = this.alerCategory.create({
      title: 'Category Name',
      inputs: [{
        name: 'name',
        placeholder: 'category Name',
        value: null
      },{
        name: 'description',
        placeholder: 'category Description',
        value: null
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {
          let toast = this.toastCtrl.create({
            message: "Cancel",
            duration: 3000
          });
          toast.present();
        }
      }, {
        text: 'Save',
        handler: data => {
          if (data.name.length > 0) {
            this.pages.push({ title: data.name, component: HomePage, expenseList: new Array<Expense>() });
            Category.setCategories(this.pages);
            let toast = this.toastCtrl.create({
              message: 'One Category has been added',
              duration: 3000
            });
            toast.present();
          }
        }
      }]
    });
    categoryPrompt.setCssClass('txtTitle');
    categoryPrompt.present();
  }
  getCatOptions() {
    this.nav.push(ManageCategoryPage);
  }
}
