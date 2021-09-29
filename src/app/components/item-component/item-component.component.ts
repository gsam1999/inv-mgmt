import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { item, ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.scss']
})
export class ItemCOmponentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  item: any = {};
  transactions: any = [];
  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id).subscribe(data => this.item = data);
    this.itemService.getHistory(id).subscribe(data => this.transactions = data.reverse());
  }

}
