import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // title = 'inv-mgmt';  
  isLoading: boolean = true;
  loadingText: string = "";

  constructor(private userService: UserService, private loderService: LoaderService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loderService.isLoading.subscribe(data => { this.isLoading = (data.length !== 0); this.loadingText = data; this.cd.detectChanges() })
  }

  logOut() {
    this.userService.logout();
  }

}
