import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { newItem } from '../components/new-item/new-item.component';
import { LoaderService } from './loader.service';


export interface item {
  _id?: string;
  name: string;
  category?: category;
  branch?: branch;
  units: string;
  imageLink: string;
  quantity: number; //{ [key: string]: number };
  monthlyRequired: number;
  notes: string;
  transactions?: Array<transaction>
}

export interface transaction {
  _id?: string | null,
  item?: item | string,
  quantity: number,
  action: 'Remove' | 'Add' | null,
  comments?: string;
  expiryDate?: string;
}

export interface category {
  _id?: string;
  name: string;
  active: boolean;
}

export interface branch {
  _id?: string;
  name: string;
  active: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class ItemService {


  constructor(private http: HttpClient, private loader: LoaderService) {
  }

  addItem(items: Array<newItem>) {
    return this.loader.getObservable(this.http.post<item>(environment.apiURI + 'items', { items: items }), "Adding Item");
  }

  getItems(): Observable<Array<item>> {
    return this.loader.getObservable(this.http.get<Array<item>>(environment.apiURI + 'items'), "Loading Items")
  }

  getItem(id: string) {
    return this.loader.getObservable(this.http.get<item>(environment.apiURI + 'items/' + id));
  }

  editItem(id: string, item: any) {
    return this.loader.getObservable(this.http.put<item>(environment.apiURI + 'items/' + id, item));
  }

  getHistory(sort: string, order: SortDirection, page: number, pageSize: number, filters: { [key: string]: any }): Observable<{ count: number, transactions: transaction[] }> {
    return this.http.get<{ count: number, transactions: transaction[] }>(environment.apiURI + `items/Transactions?sort=${sort}&order=${order}&size=${pageSize}&page=${page}&filters=${JSON.stringify(filters)}`)
  }

  getTransactions(): Observable<Array<transaction>> {
    return this.loader.getObservable(this.http.post<Array<transaction>>(environment.apiURI + 'items/GetTransactions', {}));
  }

  updateQuantity(data: transaction): Observable<item> {
    return this.loader.getObservable(this.http.post<item>(environment.apiURI + 'items/Transactions', data), "Updating Quantity...");
  }

  getCategory(): Observable<Array<category>> {
    return this.http.get<Array<category>>(environment.apiURI + 'items/category');
  }

  addCategory(category: category): Observable<Array<category>> {
    return this.http.post<Array<category>>(environment.apiURI + 'items/category', category);
  }

  updateCategory(category: category): Observable<Array<category>> {
    return this.http.post<Array<category>>(environment.apiURI + 'items/category', category);
  }

  getBranch() {
    return this.http.get<Array<branch>>(environment.apiURI + 'items/branch')
  }

  addBranch(branch: branch): Observable<Array<branch>> {
    return this.http.post<Array<branch>>(environment.apiURI + 'items/branch', branch);
  }

  updateBranch(branch: branch): Observable<Array<branch>> {
    return this.http.post<Array<branch>>(environment.apiURI + 'items/branch', branch);
  }

}
