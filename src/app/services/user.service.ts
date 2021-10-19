import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { branch } from './item.service';
import { LoaderService } from './loader.service';


export type UserWithPassword = User & { password?: string };

export class User {
  constructor(name: string, branch: Array<branch | string>, role: string, token: string, id: string) {
    this.username = name;
    this.branches = branch;
    this.role = role;
    this.token = token;
    this._id = id;

  }
  _id: string;
  username: string;
  branches: Array<branch | string>;
  role: string;
  token?: string;
  active: boolean = true;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  loggedInUser: User | null = null;
  isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router, private loader: LoaderService) {
    let data = this.getData();
    if (data && data.token) {
      this.loggedInUser = new User(data.name, data.branch, data.role, data.token, data.id);
      this.isUserLoggedIn = true;
    }
  }

  login(username: string, password: string): Observable<any> {
    return new Observable((obs) => {
      this.loader.showLoading("Logging in...");
      this.http.post(environment.apiURI + 'users/login', { username: username, password: password }).subscribe((data: any) => {
        this.loggedInUser = new User("sam", ["branch1"], "regular", data.token, '1234')
        this.isUserLoggedIn = true;
        this.setData(this.loggedInUser);
        this.loader.hideLoading();
        obs.next(this.isUserLoggedIn);
      }, err => {
        console.log(err);
        this.loader.hideLoading();
        obs.next(this.isUserLoggedIn);
      });
    })
  }

  logout() {
    this.removeData();
    this.isUserLoggedIn = false;
    this.removeData();
    this.router.navigateByUrl('/login');
  }

  getUsers() {
    return this.http.get<Array<User>>(environment.apiURI + 'users')
  }

  addUser(user: UserWithPassword) {
    user.branches = (user.branches as branch[]).map(ele => (ele._id as string));
    return this.http.post<User>(environment.apiURI + 'users/register', user)
  }

  updateUser(user: UserWithPassword) {
    user.branches = (user.branches as branch[]).map(ele => (ele._id as string));
    return this.http.put<User>(environment.apiURI + 'users/register', user)
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
