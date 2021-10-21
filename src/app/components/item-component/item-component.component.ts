import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { item, ItemService, transaction } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html'
})
export class ItemComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private itemService: ItemService, private snackBar: MatSnackBar) { }

  item: item | null = null;
  model: transaction = { item: '', quantity: 0, action: null };
  message: string = '';
  open: number = -1;


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id as string).subscribe(data => {
      this.item = data;
    });
  }

  updateStock(action: "Add" | "Remove") {
    this.model.item = this.route.snapshot.paramMap.get('id') as string;
    this.model.action = action;
    this.itemService.updateQuantity(this.model).subscribe((data: item) => { this.item = data; this.updateMessage(true) }, err => this.updateMessage(false))
  }

  updateMessage(success: boolean) {
    if (success) {
      this.message = "Stock " + (this.model.action == "Add" ? 'Added' : 'Removed') + " Successfully"
      this.snackBar.open(this.message, "ok", { duration: 5000 })
    }
    else
      this.message = "Cannot Update Stock, please try again"

    this.model.action = null;
    this.model.quantity = 0;
  }

}
