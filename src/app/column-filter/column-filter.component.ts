import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.css']
})
export class ColumnFilterComponent implements OnInit {
  public searchText: string
  public seletectedItems;
  public disableOkButton = true;
  public selectedItemsCopy: any = [];
  public uniqueItems: any = [];
  public columnFilterCopy: any = [];

  @Input() public columnFilter: any;
  @Input('rowData') public rowData: any;
  @Input() public columnField: any;
  @Output() applyColumnFilter = new EventEmitter();
  @Input('hideCancelButton') public hideCancelButton: any;
  @Output() public display = new EventEmitter();
  @Input() public isSelectedAll: any;
  @Input() public column: any;
  constructor() { }
  change(value) {
    this.disableOkButton = value;
    let temp = 0, count = 0;
    this.disableOkButton = this.columnFilter.items.filter((item) => {
      if (item.isSelected === true) {
        temp = 1;
        count++;
        if (count === this.columnFilter.items.length) {
          this.isSelectedAll = true;
        }
        return true;
      } else {
        this.isSelectedAll = false;
      }
    })
    if (temp == 0)
      this.disableOkButton = false;
  }

  ngOnInit(): void {
  }

  selectedOption(isSelectedAll: any) {

    if (isSelectedAll) {

      this.seletectedItems = [];
      this.columnFilter.selectedItems = []; 
      this.columnFilter.items.forEach((item: any) => {
        if (item.isSelected === true) {
          this.columnFilter.selectedItems.push(item.value);
        }
      })
      this.applyColumnFilter.emit([isSelectedAll, this.columnField]);
   

      this.disableOkButton = true;


    } else {
      this.seletectedItems = [];
      this.columnFilter.selectedItems = []; 
      this.columnFilter.items.forEach((item: any) => {
        if (item.isSelected === true) {
          this.columnFilter.selectedItems.push(item.value);
        }
      })
      this.applyColumnFilter.emit([isSelectedAll, this.columnField]);
    }
    this.display.emit();
  } 


  cancel() {
    this.display.emit();
  }


  search(searchText) {
    console.log(this.columnFilter)
    if (this.columnFilterCopy.length === 0) {
      this.columnFilterCopy = JSON.parse(JSON.stringify(this.columnFilter))
    }

    this.columnFilter.items = this.columnFilterCopy.items.filter((row: any) => {
      
      return row.value.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }

  selectAll(isSelected) {
    if (isSelected) {
      for (let i = 0; i < this.columnFilter.items.length; i++) {
        this.columnFilter.items[i].isSelected = true;
        console.log("select all");
      }

      this.disableOkButton = true;
    }
    else {

      for (let i = 0; i < this.columnFilter.items.length; i++) {
        this.columnFilter.items[i].isSelected = false;

      }
      this.disableOkButton = false;
    }
  }


}
