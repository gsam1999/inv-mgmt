import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HistoryGridComponent } from './components/history-grid/history-grid.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { ItemComponentComponent } from './components/item-component/item-component.component';
import { LoginComponent } from './components/login/login.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { AuthGuard } from './services/route-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'new-item', component: NewItemComponent, canActivate: [AuthGuard] },
  { path: 'item/:id', component: ItemComponentComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryGridComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

