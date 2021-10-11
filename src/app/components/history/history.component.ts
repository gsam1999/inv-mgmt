import { Component, OnInit } from '@angular/core';
import { ItemService, transaction } from 'src/app/services/item.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  transactions: Array<transaction> = [];

  ngOnInit(): void {
    this.itemService.getItems();
  }

}
