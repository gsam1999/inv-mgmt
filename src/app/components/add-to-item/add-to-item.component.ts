import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { item, ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-to-item',
  templateUrl: './add-to-item.component.html'
})
export class AddToItemComponent implements OnInit {

  constructor(private itemService: ItemService, private router: Router) { }

  items: Array<item> = [];

  model = { name: '', quantity: '' };

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  addQuantity() {
    this.itemService.updateQuantity(this.model)
    this.router.navigate(['/', 'home'])
  }

}
