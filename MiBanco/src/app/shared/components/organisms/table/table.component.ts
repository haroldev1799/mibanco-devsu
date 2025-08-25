import { AfterViewInit, Component, ContentChild, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TABLE_IMPORTS } from './table.component.constant';
import { Column } from './table.interface';

@Component({
  selector: 'app-table',
  imports: [...TABLE_IMPORTS],
  templateUrl: './table.component.html',
  styleUrl: './table.component.sass'
})
export class TableComponent<T> implements OnChanges, AfterViewInit {

  paginator!: any;
  sort!: any;
	@ContentChild('actionsTemplate') customActionsTemplate!: TemplateRef<any>;
  
  @Input() dataSource!: any;
  @Input() columns: Column<any>[] = [];
  @Input() messageEmpty: string = '';
  @Input() filter: boolean = false;

  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    this.displayedColumns = this.columns.map(c => c.header);
    if (changes['dataSource'] && this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
