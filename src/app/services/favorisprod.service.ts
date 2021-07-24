import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavorisprodService {
iteml:any=[]
  constructor() { }

  
  storeItemTofavoris(item: any) {
    var tempItem:any=JSON.parse(localStorage.getItem("items")!);
    if (tempItem == null) tempItem = [];
    localStorage.setItem("item", JSON.stringify(item));
    tempItem.push(item);
    localStorage.setItem("items", JSON.stringify(tempItem));
  }


  updateItemsInfavoris(items: any) {
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));
  }
  
  getfavorisFromItems() {
    return this.iteml = JSON.parse(localStorage.getItem("items")!);
  }
}
