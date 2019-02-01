import { ManageCategoryPage } from './../pages/manage-category/manage-category';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CreatecategoryPage } from '../pages/createcategory/createcategory'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ExpenseComponent } from '../components/expense/expense';
import { CategorypopoverComponent } from '../components/categorypopover/categorypopover';
import { OptionpopoverComponent } from '../components/optionpopover/optionpopover';
// import { XpenseApiModule }  from 'xpense-api'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ExpenseComponent,
    CategorypopoverComponent,
    OptionpopoverComponent,
    ManageCategoryPage,
    CreatecategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ExpenseComponent,
    CategorypopoverComponent,
    OptionpopoverComponent,
    ManageCategoryPage,
    CreatecategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
