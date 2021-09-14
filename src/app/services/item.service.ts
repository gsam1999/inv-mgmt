import { Injectable } from '@angular/core';


export interface item {
  name: string;
  type: string;
  measurement: string;
  image: string;
  quantity: number //{ [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  itemList: Array<item> = [];
  constructor() {
    if (localStorage.getItem('items')) {
      this.itemList = JSON.parse(localStorage.getItem('items') as string);
    }
  }

  branch = "branch1";

  addToItem(item: item) {
    this.itemList.push(item);
    localStorage.setItem('items', JSON.stringify(this.itemList));
  }

  updateQuantity(data: any) {

    this.itemList.forEach(ele => {
      if (ele.name == data.name) {
        ele.quantity = Number(ele.quantity) + Number(data.quantity);
        return
      }
    })

    localStorage.setItem('items', JSON.stringify(this.itemList));
  }

  getItems(): Array<item> {
    let items: Array<any> = [];

    if (localStorage.getItem('items')) {
      items = JSON.parse(localStorage.getItem('items') as string);
    }

    return items
  }

}
