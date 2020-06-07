import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { DataGridLoaderComponent } from './data-grid-loader/data-grid-loader.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { from } from 'rxjs';
import { MainTableComponent } from './main-table/main-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    ColumnFilterComponent,
    DataGridLoaderComponent,
    DataGridComponent,
    MainTableComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
