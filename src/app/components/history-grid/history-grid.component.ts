import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { branch, category, item, ItemService, transaction } from 'src/app/services/item.service';

@Component({
  selector: 'history-grid',
  templateUrl: './history-grid.component.html'
})
export class HistoryGridComponent implements AfterViewInit, OnChanges, OnInit {

  @Input() item: item;

  displayedColumns: string[] = ['createdAt', 'itemName', 'branch', 'action', 'username', 'expiryDate'];
  data: transaction[] = [];
  resultsLength = 0;
  isLoading: boolean = true;

  filters: { item?: string, name?: string, branches?: Array<string> | null, category?: Array<string> | null, action?: "Add" | "Remove" } = {};

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

    this.filters.branches && !this.filters.branches.length && (this.filters.branches = null)
    this.filters.category && !this.filters.category.length && (this.filters.category = null)

    this.paginator.pageIndex = 0;
    this.paginator.page.emit();
  }

  clearFilters() {
    this.filters = {};
  }

  _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  dateDiffInDays(a: any, b: any): string {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    let days = Math.floor((utc1 - utc2) / this._MS_PER_DAY)

    if (days < 7)
      return "expiring-soon"
    else if (days < 16)
      return "expiring"
    return "";
  }


  getClass(row: transaction): string {
    if (!row.expiryDate)
      return ""
    return this.dateDiffInDays(new Date(row.expiryDate), new Date());
  }

}
