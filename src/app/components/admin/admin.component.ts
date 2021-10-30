import { Component, OnInit } from '@angular/core';
import { branch, category, ItemService } from 'src/app/services/item.service';
import { User, UserService, UserWithPassword } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  users: Array<UserWithPassword> = [];
  branches: Array<branch> = [];
  categories: Array<category> = [];

  step1: number | null;
  step2: number | null;
  step3: number | null;

  constructor(private userService: UserService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {

      if (this.userService.loggedInUser?.username != 'admin') {
        users = users.filter(ele => ele.username != "admin")
      }
      this.users = users;
      this.step1 = null;
    })

    this.itemService.getCategory().subscribe(data => this.categories = data);
    this.itemService.getBranch().subscribe(data => this.branches = data);
  }

  getBranchNames(branches: Array<branch | string>) {
    return branches.length ? (branches as branch[]).map(ele => ele.name).join(', ') : '';
  }

  updateUser(user: UserWithPassword) {
    if (user.username == 'admin')
      return

    this.userService.updateUser({ ...user }).subscribe(data => this.ngOnInit())
  }

  addUser(user: UserWithPassword) {
    this.userService.addUser({ ...user }).subscribe(data => this.ngOnInit())
  }

  addNewUserObject() {
    this.step1 = this.users.push({ username: '', password: '', role: '', branches: [], _id: '', active: true }) - 1;
  }

  updateCategory(category: category) {
    this.itemService.updateCategory({ ...category }).subscribe(data => {
      this.step2 = null;
    })
  }

  addCategory(category: category) {
    this.itemService.addCategory(category).subscribe(data => {
      this.step2 = null;
    })
  }

  addNewCategoryObject() {
    this.step2 = this.categories.push({ name: '', _id: '', active: true }) - 1;
  }


  updateBranch(branch: branch) {
    this.itemService.updateBranch({ ...branch }).subscribe(data => {
      this.ngOnInit();
      this.step3 = null;
    })
  }

  addBranch(branch: branch) {
    this.itemService.addBranch(branch).subscribe(data => {
      this.step3 = null;
    })
  }

  addNewBranchObject() {
    this.step3 = this.branches.push({ name: '', _id: '', active: true }) - 1;
  }


  objectComparisonFunction(option: any, value: any): boolean {
    return (value && value._id) && (option._id == value._id)
  }


}
