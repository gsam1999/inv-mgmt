import { Component, OnInit } from '@angular/core';
import { ItemService, branch, category, transaction } from 'src/app/services/item.service';

@Component({
  selector: 'app-expiry',
  templateUrl: './expiry.component.html'
})
export class ExpiryComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  branches: branch[] = [];
  categories: category[] = [];

  transactions: Array<transaction & { days?: number }> = [];

  filters: { name?: string, branches?: Array<string> | null, category?: Array<string> | null, action?: "Add" | "Remove", expire?: boolean } = { expire: true };

  ngOnInit() {
    this.itemService.getBranch().subscribe(data => {
      this.branches = data;
    })
    this.itemService.getCategory().subscribe(data => {
      this.categories = data;
    })
  }

  ngAfterViewInit() {
    this.itemService.getHistory('expiryDate', 'asc', 0, 100, this.filters).subscribe(data => {
      this.transactions = data.transactions; this.transactions.forEach(ele => ele.days = this.dateDiffInDays(ele.expiryDate as string))
    });
  }

  dateDiffInDays(dateString: string): number {
    let a = new Date(dateString);
    let b = new Date();
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24))
  }
}
