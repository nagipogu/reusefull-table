import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridLoaderComponent } from './data-grid-loader.component';

describe('DataGridLoaderComponent', () => {
  let component: DataGridLoaderComponent;
  let fixture: ComponentFixture<DataGridLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataGridLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
