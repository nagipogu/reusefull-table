import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-data-grid-loader',
  templateUrl: './data-grid-loader.component.html',
  styleUrls: ['./data-grid-loader.component.css']
})
export class DataGridLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  private load = false;

  @Input()
  set loading(show: boolean) {
    this.load = show;
  }

  get loading(): boolean {
    return this.load;
  }

  @Input() message;
}
