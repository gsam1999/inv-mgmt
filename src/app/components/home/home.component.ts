import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  items: any = [];

  ngOnInit(): void {
    this.items = this.itemService.getItems();

  }

}
