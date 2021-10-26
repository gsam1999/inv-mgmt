import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { branch, category, item, ItemService, transaction } from 'src/app/services/item.service';

@Component({
  selector: 'history-grid',
  templateUrl: './history-grid.component.html'
})
export class HistoryGridComponent implements AfterViewInit, OnChanges, OnInit {

  @Input() item: item;

  displayedColumns: string[] = ['createdAt', 'itemName', 'action', 'branch', 'username', 'expiryDate'];
  data: transaction[] = [];
  resultsLength = 0;
  isLoading: boolean = true;

  filters: { item?: string, name?: string, branches?: Array<string> | null, category?: Array<string> | null, action?: "Add" | "Remove", expire?: boolean } = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemService: ItemService) { }

  branches: branch[] = [];
  categories: category[] = [];

  ngOnInit() {

    if (this.item)
      this.filters.item = this.item._id
    else {
      this.itemService.getBranch().subscribe(data => {
        this.branches = data;
      })
      this.itemService.getCategory().subscribe(data => {
        this.categories = data;
      })
    }
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.itemService.getHistory(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filters)
            .pipe(catchError(() => of(null)));
        }),
        map(data => {
          this.isLoading = false;
          if (data === null) {
            return [];
          }
          this.resultsLength = data.count;
          return data.transactions;
        })
      ).subscribe(data => this.data = data);
  }

  ngOnChanges() {
    if (this.item)
      this.displayedColumns = ['createdAt', 'action', 'after', 'username', 'comments', 'expiryDate']
    this.paginator && this.paginator.page.emit();
  }

  applyFilters() {
    this.filters.branches && !this.filters.branches.length && (delete this.filters.branches)
    this.filters.category && !this.filters.category.length && (delete this.filters.category)
    this.paginator.pageIndex = 0;
    this.paginator.page.emit();
  }

  clearFilters() {
    this.filters = {};
    this.applyFilters();
  }

}
