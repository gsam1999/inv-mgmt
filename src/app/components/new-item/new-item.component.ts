import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { branch, category, item, ItemService } from 'src/app/services/item.service';


export type newItem = Omit<item, 'category' | 'branch'> & { category: string, branch: string }

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html'
})
export class NewItemComponent implements OnInit {

  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private snackbar: MatSnackBar) { }

  model: newItem = { name: '', category: '', units: '', quantity: 0, imageLink: '', monthlyRequired: 0, branch: '', notes: '' };
  branchList: branch[] = [];
  categoryList: category[] = [];
  branches: Array<branch & { monthlyRequired: number }> = []
  id: string | null = '';
  item: Omit<item, 'category'> & { category: string };

  ngOnInit(): void {

    this.itemService.getCategory().subscribe(data => this.categoryList = data);
    this.itemService.getBranch().subscribe(data => this.branchList = data);
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.itemService.getItem(this.id as string).subscribe(data => {
        this.item = data;

        Object.assign(this.model, this.item, { category: data.category._id })

        this.branches = [Object.assign(this.item.branch, { monthlyRequired: this.item.monthlyRequired })];
      })
    }
  }

  addItem() {
    let items: Array<newItem> = [];
    this.branches.forEach(ele => {
      let model: newItem = { ...this.model };
      model.branch = ele._id as string;
      model.monthlyRequired = ele.monthlyRequired;
      model.name = model.name.toLocaleLowerCase();
      items.push(model);
    })

    this.itemService.addItem(items).subscribe(data => {
      this.snackbar.open("Items Added Successfully", "", { duration: 5000 })
    })
  }

  updateItem() {

    this.item.name = this.model.name;
    this.item.category = this.model.category;
    this.item.notes = this.model.notes;
    this.item.imageLink = this.model.imageLink;
    this.item.units = this.model.units;
    this.item.monthlyRequired = this.branches[0].monthlyRequired;

    this.itemService.editItem(this.id as string, this.item).subscribe(data => {
      this.snackbar.open("Items updated Successfully", "OK", { duration: 5000 })
      this.router.navigate(['/', 'item', this.id])
    })

  }

  objectComparisonFunction(option: any, value: any): boolean {
    return (value && value._id) && (option._id == value._id)
  }


}
