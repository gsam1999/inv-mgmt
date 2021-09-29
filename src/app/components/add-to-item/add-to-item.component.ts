import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { item, ItemService, transaction } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-to-item',
  templateUrl: './add-to-item.component.html'
})
export class AddToItemComponent implements OnInit {

  constructor(private itemService: ItemService, private router: Router) { }

  items: Array<item> = [];
  item: any = {};

  model: transaction = { _id: null, quantity: null, action: 'add' };

  ngOnInit(): void {
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  addQuantity() {
    this.model._id = this.item._id;
    this.itemService.updateQuantity(this.model).subscribe(data => this.router.navigate(['/', 'home']))
  }

}
