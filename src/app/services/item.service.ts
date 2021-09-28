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
  transactions: Array<{ name: string, quantity: number, type: "added" | "removed" }> = [];

  constructor() {
    if (localStorage.getItem('items')) {
      this.itemList = JSON.parse(localStorage.getItem('items') as string);
    }
    if (localStorage.getItem('transactions')) {
      this.transactions = JSON.parse(localStorage.getItem('transactions') as string);
    }
  }

  branch = "branch1";


  addToItem(item: item) {
    this.itemList.push(item);
    localStorage.setItem('items', JSON.stringify(this.itemList));
  }

  addQuantity(data: any) {

    this.itemList.forEach(ele => {
      if (ele.name == data.name) {
        ele.quantity = Number(ele.quantity) + Number(data.quantity);
        this.transactions.push({ name: data.name, quantity: data.quantity, type: 'added' })
        return
      }
    })

    localStorage.setItem('items', JSON.stringify(this.itemList));
    localStorage.setItem('transactions', JSON.stringify(this.transactions))
  }

  removeQuantity(data: any) {
    this.itemList.forEach(ele => {
      if (ele.name == data.name) {
        this.transactions.push({ name: data.name, quantity: data.quantity, type: 'removed' })
        ele.quantity = Number(ele.quantity) - Number(data.quantity);
        return
      }
    })

    localStorage.setItem('items', JSON.stringify(this.itemList));
    localStorage.setItem('transactions', JSON.stringify(this.transactions))
  }

  getItems(): Array<item> {
    let items: Array<any> = [];

    if (localStorage.getItem('items')) {
      items = JSON.parse(localStorage.getItem('items') as string);
    }

    return items
  }

  getItem(name: string) {
    let item;

    if (localStorage.getItem('items')) {
      item = (JSON.parse(localStorage.getItem('items') as string) as Array<item>).find(ele => ele.name == name);
    }

    return item
  }



}
