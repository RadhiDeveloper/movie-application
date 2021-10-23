import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {EventsService} from "../shared/events.service";

@Component({
  selector: 'category-view',
  styleUrls: ['./table-component.component.scss'],
  template: `
    <input type="checkbox" class="custom-checkbox">
  `,
})

export class ButtonViewComponent implements OnInit {
  renderValue: any = [];
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  onClick() {
    this.save.emit(this.rowData);
  }
}

@Component({
  selector: 'certification-view',
  styleUrls: ['./table-component.component.scss'],
  template: `
    <ng-container *ngIf="value === 'General'">
      <div class="tag-style green">
        {{value}}
      </div>
    </ng-container>
    <ng-container *ngIf="value === 'CA-PG'">
      <div class="tag-style yellow">
        {{value}}
      </div>
    </ng-container>
    <ng-container *ngIf="value === '14 Accompaniment'">
      <div class="tag-style pink">
        {{value}}
      </div>
    </ng-container>
  `,
})

export class CertificationViewComponent implements OnInit {
  renderValue: any = [];
  @Input() value: any;
  @Input() rowData: any;
  isGeneral: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log(this.value);
  }

  onClick() {
    this.save.emit(this.rowData);
  }
}

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit, OnChanges{
  @Input() tableHeaders: any;
  @Input() moviesList: any;
  @Input() certificationList: any;
  @Input() directorList: any;
  settings = {};
  constructor(private events: EventsService) {}

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'directorList': {
            this.settings = {
              actions: false,
              attr: {
                class: 'ng2-table'
              },
              columns: {
                checkBox: {
                  title: '  ',
                  class: 'table-column',
                  type: 'custom',
                  filter: false,
                  renderComponent: ButtonViewComponent,
                  onComponentInitFunction(instance: any) {
                    instance.save.subscribe(() => {
                    });
                  },
                  width: '10px'
                },
                title: {
                  title: 'Title',
                  class: 'table-column',
                  placeholder: 'Search by title'
                },
                releaseDate: {
                  title: 'Year',
                  class: 'table-column',
                  placeholder: 'Search by year'
                },
                length: {
                  title: 'Running Time',
                  class: 'table-column',
                  placeholder: 'Search by time'
                },
                director: {
                  title: 'Director',
                  class: 'table-column',
                  filter: {
                    type: 'list',
                    config: {
                      selectText: 'All',
                      list: this.directorList,
                    },
                  },
                },
                certification: {
                  title: 'Certification',
                  class: 'table-column',
                  type: 'custom',
                  renderComponent: CertificationViewComponent,
                  onComponentInitFunction(instance: any) {
                    instance.save.subscribe(() => {
                    });
                  },
                  filter: {
                    type: 'list',
                    config: {
                      selectText: 'All',
                      list: this.certificationList,
                    },
                  },
                },
                rating: {
                  title: 'Rating',
                  class: 'table-column',
                  placeholder: 'Search by Rating'
                }
              },
            };
          }
        }
      }
    }
  }

  onSelectRow(rowData: any) {
    const data = {
      isOpen: true,
      data: rowData
    };
    this.events.openMoviePopup.emit(data);
  }

  ngOnInit(): void {
  }

}
