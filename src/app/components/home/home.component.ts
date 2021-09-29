import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { item, ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  searchControl: FormControl = new FormControl()
  items: Array<item> = [];
  allItems: Array<item> = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {

    this.itemService.getItems().subscribe(data => { this.items = data; this.allItems = [...data] });

    this.searchControl.valueChanges.subscribe(string => {
      if (!string)
        this.items = this.allItems;
      this.items = this.items.filter(ele => ele.name.includes(string));
    })

  }

}
