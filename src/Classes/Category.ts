import {Expense} from "./Expense";
export class Category{
    // variable for list of categories
    private static _categories:any;
    // variable for selected category with default value 0
    private static _selectedCategory:any = 0;

    constructor(){
        
    }
    // list of getters and setters
   static getSelectedCategory():any{
        return this._selectedCategory;
    }
    static setSelectedCategory(index:any){
        this._selectedCategory = index;
    }
   static getCategories():any{
       return  this._categories;
   }
   static setCategories(newCategories:any){
        this._categories = newCategories;
    }
    
}