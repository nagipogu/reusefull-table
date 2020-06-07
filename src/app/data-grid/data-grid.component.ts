import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {

  constructor() { }
  public rowData: any = [];
  public rowDataCopy: any = [];
  // public loader = true;
  public disableColumnFilter = false;
  public columnField: any;
  public hideCancelButton = false;
  public firstSelectedColumn;
  public count = 0;
  private eventsSubscription: Subscription;
  @Input('loader') loader: boolean;
  @Input() resetFilterEvents: Observable<void>;

  public isSelectedAll = true;

  @Input('rowData') set copy(data: any) {
    if (data && data.length) {
      this.loader = false;
      this.rowData = data;
      this.rowDataCopy = JSON.parse(JSON.stringify(data));
    }
  };

  public columnDef;

  @Input('config') set columnConfig(config) {
    this.columnDef = config;
    this.setColumnFilterData();
  }
  @Output() openModal = new EventEmitter();


  public uniqueItems: any = [];
  public uniqueOption: any = [];
  public originalRowData: any = [];
  public columnFilter: any = {
    data: {},
    selectedColumn: '',
  }



  openModal1(template) {
    this.openModal.emit();
  }
  clearFilters() {
    this.count = 0;
    this.setColumnFilterData();
    this.rowData = JSON.parse(JSON.stringify(this.rowDataCopy));
  }

  setColumnFilterData() {
    this.columnDef.forEach((column) => {
      this.columnFilter.data[column.field] = { items: [], selectedItems: [], display: false, }
    });
  }

  /*when the filter icon is clicked, the toggleColumnFilter method is called 
    for getting unique values and send the unique values to ColumnFilter component*/

  toggleColumnFilter(columnField) {
    this.isSelectedAll = true;
    this.hideCancelButton = !this.hideCancelButton;
    this.columnFilter.display = !this.columnFilter.display;
    this.columnFilter.selectedColumn = columnField;
    this.uniqueItems = [];

    if (this.columnFilter.display === true) {
      let itemsCopy = JSON.parse(JSON.stringify(this.columnFilter.data[columnField].items));
      this.columnFilter.data[columnField].items = [];
      this.rowData.map((x: any) => {
        if (this.uniqueItems.indexOf(x[columnField]) === -1 && x[columnField] !== undefined) {
          this.uniqueItems.push(x[columnField]);
          if (this.columnFilter.data[columnField].items) {
            this.columnFilter.data[columnField].items.push({
              value: (x[columnField]),
              isSelected: true,
            });
          }
        }

      });
      /*
      Pushing the unchecked options to the popup check list based on the
      previous copy of checklist
      */
      itemsCopy.forEach((item) => {
        if (!item.isSelected) {

          this.columnFilter.data[columnField].items.push({ value: item.value, isSelected: item.isSelected });
        }
      })
      this.columnFilter.data[columnField].items.forEach((row) => {
        if (row.isSelected === false) {
          this.isSelectedAll = false;


        }
      })
    }
  }
  ngOnInit(): void {
  }
  public temp: any = [];

  display() {
    this.columnFilter.display = !this.columnFilter.display;
  }

  applyColumnFilter(isSelectedAll) {
    let currentlySelectedColumn = isSelectedAll[1];
    let rows;

    if (this.count == 0) {
      this.count = 1;
      this.firstSelectedColumn = currentlySelectedColumn;
    }

    rows = JSON.parse(JSON.stringify(this.rowDataCopy));

    for (let i = 0; i < rows.length; i++) {
      let isMatched = true;
      Object.keys(this.columnFilter.data).forEach((key) => {
        const len = this.columnFilter.data[key].selectedItems.length;
        if (len && !(this.firstSelectedColumn == currentlySelectedColumn && isSelectedAll[0]) && this.columnFilter.data[key].selectedItems.indexOf(rows[i][key]) === -1) {
          isMatched = false;
        }
      })

      if (isMatched) {
        this.temp.push(rows[i]);
      }
    }
    this.rowData = this.temp;
    this.temp = [];

  }

  sortColumn(field: any, filter: any) {
    filter.forEach((column: any, index: number) => {
      if (column.field === field) {
        column.currentSort = (!column.currentSort || column.currentSort === 'asc') ? 'desc' : 'asc';
        this.sortData(field, this.rowData, column.currentSort);
      } else {
        column.currentSort = '';
      }
    });
  }

  public sortData(field: string, data: any, orderBy: string): any {
    data.sort((a, b) => {
      const nameA = a[field];
      const nameB = b[field];
      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      if (!orderBy || orderBy === 'desc') {
        return comparison * -1;
      } else {
        return comparison;
      }
    });
  }
}
