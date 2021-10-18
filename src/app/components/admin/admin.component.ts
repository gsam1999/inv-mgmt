import { Component, OnInit } from '@angular/core';
import { branch, ItemService } from 'src/app/services/item.service';
import { User, UserService, UserWithPassword } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  username = '';
  password = ''

  users: Array<UserWithPassword>;
  step: number;

  constructor(private userService: UserService, public itemService: ItemService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  updateUser(user: UserWithPassword) {
    this.userService.updateUser(user).subscribe(data => {
      this.ngOnInit();
    })
  }

  getBranchNames(branches: Array<branch | string>) {
    return (branches as branch[]).map(ele => ele.name).join(', ');
  }

  addUser(user: UserWithPassword) {
    this.userService.addUser(user).subscribe(data => {
      this.ngOnInit();
    })
  }

  objectComparisonFunction(option: any, value: any): boolean {
    return (value && value._id) && (option._id == value._id)
  }

  setStep(c: number) {
    this.step = c;
  }

}
