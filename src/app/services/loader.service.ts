import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() { }

  showLoading(text: string) {
    this.isLoading.next(text)
  }

  hideLoading() {
    this.isLoading.next("")
  }


}
