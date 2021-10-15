import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { item, ItemService, transaction } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html'
})
export class ItemComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  item: item | null = null;
  model: transaction = { _id: null, quantity: null, action: null };
  message: string = ''

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.model._id = id;
    this.itemService.getItem(id).subscribe(data => {
      this.item = data;
    });
  }

  updateStock(action: string) {
    this.itemService.updateQuantity(this.model).subscribe((data: item) => { this.item = data; this.updateMessage(true) }, err => this.updateMessage(false))
  }

  updateMessage(success: boolean) {
    if (success)
      this.message = "Stock Updated Successfully"
    else
      this.message = "Cannot Update Stock, please try again"

    this.model.quantity = 0;
  }

}
