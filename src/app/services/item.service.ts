import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface item {
  _id?: number;
  name: string;
  type: string;
  measurement: string;
  image: string;
  quantity: number; //{ [key: string]: number };
  requiredPerMonth: number;
}

export interface transaction {
  _id: number | null, quantity: number | null, action?: 'remove' | 'add'
}

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  itemList: Array<item> = [];
  transactions: Array<{ name: string, quantity: number, type: "added" | "removed" }> = [];

  constructor(private http: HttpClient) {
  }

  branch = "branch1";

  addItem(item: item) {
    return this.http.post<item>(environment.apiURI + 'items', item);
  }

  updateQuantity(data: transaction) {
    return this.http.post<item>(environment.apiURI + 'items/' + data._id + '/updatequantity', data);
  }

  getItems(): Observable<Array<item>> {
    return this.http.get<Array<item>>(environment.apiURI + 'items');
  }

  getItem(id: number) {
    return this.http.get<item>(environment.apiURI + 'items/' + id);
  }

  getHistory(id: number) {
    return this.http.get<Array<{ itemid: number, data: any }>>(environment.apiURI + 'items/' + id + '/transactions');
  }



}
