import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let currentUser = this.userService.loggedInUser;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        else {
            this.router.navigate(['/', 'login']);
        }
        return next.handle(request)
    }
}