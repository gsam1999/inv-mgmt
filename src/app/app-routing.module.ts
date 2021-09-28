import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToItemComponent } from './components/add-to-item/add-to-item.component';
import { HomeComponent } from './components/home/home.component';
import { ItemCOmponentComponent } from './components/item-component/item-component.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { RemoveFromItemComponent } from './components/remove-from-item/remove-from-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new-item', component: NewItemComponent },
  { path: 'add', component: AddToItemComponent },
  { path: 'remove', component: RemoveFromItemComponent },
  { path: 'item/:id', component: ItemCOmponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

