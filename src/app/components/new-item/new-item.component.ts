import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { item, ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html'
})
export class NewItemComponent implements OnInit {

  constructor(private itemService: ItemService, private router: Router) { }

  model: item = { name: '', type: '', measurement: 'Kg', quantity: 0, image: '' };

  ngOnInit(): void {

  }

  addQuantity() {
    this.itemService.addToItem(this.model)
    this.router.navigate(['/', 'home'])
  }

}
