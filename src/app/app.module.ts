import { ErrorHandler, NgModule } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { ItemComponentComponent } from './components/item-component/item-component.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './services/token-interceptor.service';
//import { HistoryComponent } from './components/history/history.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { HistoryGridComponent } from './components/history-grid/history-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ErrorHandlerService } from './services/error-handler.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewItemComponent,
    ItemComponentComponent,
    LoginComponent,
    //HistoryComponent,
    AdminComponent,
    ItemCardComponent,
    HistoryGridComponent,
    SnackBarComponent
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
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
