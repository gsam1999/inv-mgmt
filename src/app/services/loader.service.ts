import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() { }

  getObservable(obs: Observable<any>, text: string = 'Loading, Please Wait...'): Observable<any> {
    return new Observable(observer => {
      this.showLoading(text);
      obs.subscribe(data => { this.hideLoading(); observer.next(data) }, err => { this.hideLoading(); observer.error(err), () => { observer.complete() } })
    })
  }
  showLoading(text: string) {
    this.isLoading.next(text)
  }

  hideLoading() {
    this.isLoading.next("")
  }


}
