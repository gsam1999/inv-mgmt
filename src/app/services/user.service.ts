import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

class LoggedInUser {
  constructor(name: string, branch: string, role: string, token: string) {
    this.name = name;
    this.branch = branch;
    this.role = role;
    this._token = token;
  }
  private name: string;
  private branch: string;
  private role: string;
  private _token: string;

  get token(): string {
    return this._token
  }
}


@Injectable({
  providedIn: 'root'
})

export class UserService {

  loggedInUser: LoggedInUser | null = null;
  isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    let data = this.getData();
    if (data && data._token) {
      this.loggedInUser = new LoggedInUser(data.name, data.branch, data.role, data._token);
      this.isUserLoggedIn = true;
    }
  }

  login(returnUrl?: string) {
    //this.http.post(environment.apiURI + 'login', {});  
    this.loggedInUser = new LoggedInUser("sam", "branch1", "regular", "1233457")
    this.isUserLoggedIn = true;
    if (returnUrl)
      this.router.navigateByUrl(returnUrl);
    this.setData(this.loggedInUser)
  }

  logout() {
    this.removeData();
    this.isUserLoggedIn = false;
    this.removeData();
    this.router.navigateByUrl('/login');
  }

  private setData(data: any) {
    data && localStorage.setItem('userData', JSON.stringify(data))
  }

  private getData(): any | null {
    let data = localStorage.getItem('userData')
    if (data)
      return JSON.parse(data);
    else
      return null;
  }

  private removeData() {
    localStorage.removeItem('userData')
  }


}
