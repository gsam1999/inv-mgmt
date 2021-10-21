import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { branch, category, item, ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  searchQuery: string = '';
  branchQuery: Array<string> = [];
  categoryQuery: Array<string> = [];
  sortBy: string = '';

  items: Array<item> = [];
  allItems: Array<item> = [];
  uniqueNames: string[] = [];

  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
      this.allItems = [...data]
      this.allItems.forEach(ele => {
        this.uniqueNames.indexOf(ele.name) == -1 && this.uniqueNames.push(ele.name)
      })
    });
  }

  filterChange() {
    let items = this.allItems;
    items = items.filter(ele => {
      let name = this.searchQuery ? ele.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true
      let branch = this.branchQuery.length ? this.branchQuery.indexOf((ele.branch as branch)._id as string) != -1 : true
      let category = this.categoryQuery.length ? this.categoryQuery.indexOf((ele.category as category)._id as string) != -1 : true

      return name && branch && category
    });

    this.sortBy && (items = items.sort((a, b): number => {
      if (this.sortBy == 'needRefill') {
        if ((a.quantity - a.monthlyRequired) / a.monthlyRequired >= (b.quantity - b.monthlyRequired) / b.monthlyRequired)
          return 1
        else
          return -1
      }
      else {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }

    }))

    this.items = items;
  }

  clearFilters() {
    this.searchQuery = '';
    this.branchQuery = [];
    this.categoryQuery = [];
    this.sortBy = ''

    this.filterChange();
  }

}
