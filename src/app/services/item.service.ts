import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';


export interface item {
  _id?: number;
  name: string;
  type: string;
  measurement: string;
  image: string;
  quantity: number; //{ [key: string]: number };
  requiredPerMonth: number;
  notes: string;
  transactions?: Array<transaction>;
}

export interface transaction {
  _id: number | null, quantity: number | null, action?: 'Remove' | 'Add' | null
}

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  itemList: Array<item> = [];
  transactions: Array<{ name: string, quantity: number, type: "added" | "removed" }> = [];

  constructor(private http: HttpClient, private loader: LoaderService) {
  }

  branch = "branch1";

  getObservable(obs: Observable<any>, text: string = 'Loading, Please Wait...'): Observable<any> {
    return new Observable(observer => {
      this.loader.showLoading(text);
      setTimeout(() => {
        obs.subscribe(data => { this.loader.hideLoading(); observer.next(data) }, err => { observer.next(err), () => { observer.complete() } })
      }, 2000)

    })
  }

  addItem(item: item) {
    return this.getObservable(this.http.post<item>(environment.apiURI + 'items', item), "Adding Item");
  }

  updateQuantity(data: transaction): Observable<item> {
    return this.getObservable(this.http.post<item>(environment.apiURI + 'items/' + data._id + '/updatequantity', data), "Updating Quantity...");
  }

  getItems(): Observable<Array<item>> {
    return this.getObservable(this.http.get<Array<item>>(environment.apiURI + 'items'), "Loading Items")
  }

  getItem(id: number) {
    return this.getObservable(this.http.get<item>(environment.apiURI + 'items/' + id));
  }

}
