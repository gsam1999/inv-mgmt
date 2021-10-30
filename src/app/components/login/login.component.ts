import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  username: string = '';
  password: string = '';
  returnUrl: string = '/home';
  loginFailed: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.returnUrl = (params.returnUrl || this.returnUrl));
    this.userService.isUserLoggedIn && this.router.navigate(['home'])
  }

  login() {
    this.userService.login(this.username, this.password).subscribe(status => {
      status && this.router.navigateByUrl(this.returnUrl);
      this.loginFailed = !status
      if (!status) {
        this.loginFailed = true;
        this.username = '';
        this.password = '';
      }
    })
  }

}
