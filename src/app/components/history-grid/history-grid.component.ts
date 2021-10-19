import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { item, ItemService, transaction } from 'src/app/services/item.service';

@Component({
  selector: 'history-grid',
  templateUrl: './history-grid.component.html'
})
export class HistoryGridComponent implements AfterViewInit, OnChanges {

  @Input() item: item;

  displayedColumns: string[] = ['createdAt', 'itemName', 'category', 'branch', 'action', 'username'];
  data: transaction[] = [];
  resultsLength = 0;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemService: ItemService) { }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.itemService.getHistory(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize)
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
      this.displayedColumns = ['createdAt', 'action', 'after', 'username']
    this.paginator && this.paginator.page.emit();
  }

}
