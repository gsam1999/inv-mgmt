import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  username: string = '';
  password: string = '';
  returnUrl: string = '/home';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.returnUrl = (params.returnUrl || this.returnUrl));
  }

  login() {
    this.userService.login(this.returnUrl)
  }

}
