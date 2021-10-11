import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // title = 'inv-mgmt';  

  constructor(private userService: UserService) {
  }

  logOut() {
    this.userService.logout();
  }

}
