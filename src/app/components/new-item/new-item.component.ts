import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { branch, category, item, ItemService } from 'src/app/services/item.service';


export type newItem = Omit<item, 'category' | 'branch'> & { category: string, branch: string }

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html'
})
export class NewItemComponent implements OnInit {

  constructor(public itemService: ItemService, private router: Router) { }

  model: newItem = { name: '', category: '', units: '', quantity: 0, imageLink: '', monthlyRequired: 0, branch: '', notes: '' };
  branches: Array<branch & { monthlyRequired: number }> = []

  ngOnInit(): void {
  }

  addItem() {

    let items: Array<newItem> = [];
    this.branches.forEach(ele => {
      let model: newItem = { ...this.model };
      model.branch = ele._id as string;
      model.monthlyRequired = ele.monthlyRequired;
      items.push(model);
    })

    this.itemService.addItem(items).subscribe(data => {
      this.router.navigate(['/', 'home'])
    })

  }

}
