import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { item } from 'src/app/services/item.service';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html'
})
export class ItemCardComponent implements OnInit, OnChanges {

  @Input() item: item | null = null;
  @Input() lite: boolean = false;
  deficit: 1 | 2 | 3 = 3;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {

  }

}
