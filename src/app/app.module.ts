import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './components/home/home.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { MatCardModule } from '@angular/material/card';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AddToItemComponent } from './components/add-to-item/add-to-item.component';
import { RemoveFromItemComponent } from './components/remove-from-item/remove-from-item.component';
import { MatSelectModule } from '@angular/material/select';
import { ItemCOmponentComponent } from './components/item-component/item-component.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewItemComponent,
    AddToItemComponent,
    RemoveFromItemComponent,
    ItemCOmponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
