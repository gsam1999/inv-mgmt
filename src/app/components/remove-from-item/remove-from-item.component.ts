import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService, item } from 'src/app/services/item.service';

@Component({
  selector: 'app-remove-from-item',
  templateUrl: './remove-from-item.component.html'
})
export class RemoveFromItemComponent implements OnInit {

  constructor(private itemService: ItemService, private router: Router) { }

  items: Array<item> = [];

  model = { name: '', quantity: '' };

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  addQuantity() {
    this.itemService.removeQuantity(this.model)
    this.router.navigate(['/', 'home'])
  }
}
