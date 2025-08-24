import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from './table.component';
import { Column } from './table.interface';
import { of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent<any>);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set displayedColumns from columns input', () => {
    const columns: Column<any>[] = [
      { header: 'name', field: 'name' },
      { header: 'age', field: 'age' }
    ];

    component.columns = columns;
    component.ngOnChanges({
      columns: {
        currentValue: columns,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.displayedColumns).toEqual(['name', 'age']);
  });

  it('should accept messageEmpty input', () => {
    component.messageEmpty = 'No records found';
    expect(component.messageEmpty).toBe('No records found');
  });

  it('should set displayedColumns to empty when no columns provided', () => {
    component.columns = [];
    component.ngOnChanges({
      columns: {
        currentValue: [],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.displayedColumns).toEqual([]);
  });
});
