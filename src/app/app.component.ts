// Angular Modules
import { Component, OnInit } from '@angular/core';

// App Services
import { InitializerService } from './shared/services/initializer.service';
import { PropertiesService } from './shared/services/properties.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private url: string;
  public title = 'Anticipa Properties';
  public data: object;
  public properties: object[];
  public paginationLinks: object;
  public moreProperties: boolean;

  constructor(
    private initializerService: InitializerService,
    private propertiesService: PropertiesService
  ) {
    this.properties = [];
    this.moreProperties = true;
  }

  ngOnInit(): void {
    this.data = this.initializerService.data;
    this.getProperties('data');
    this.getPaginationLinks('links');
    this.getUrl();
  }

  roundPrice(data: object[], prop: string): object[] {
    data.map(item => {
      item[prop].field_inmu_prec = `${Math.round(
        parseInt(item[prop].field_inmu_prec, 10)
      )} €`;
    });

    return data;
  }

  getProperties(prop: string): void {
    let data: object[];

    data = [...this.properties, ...this.data[prop]];

    this.properties = this.roundPrice(data, 'attributes');
    console.log(this.properties.length);
  }

  getPaginationLinks(prop: string): void {
    this.paginationLinks = this.data[prop];
  }

  getUrl(): void {
    let key: string;

    key = this.paginationLinks.hasOwnProperty('next')
      ? 'next'
      : this.paginationLinks.hasOwnProperty('last')
      ? 'last'
      : '';

    if (key !== '') {
      this.url = this.paginationLinks[`${key}`].href.replace('http', 'https');
    } else {
      this.moreProperties = false;
    }
  }

  getMoreProperties(): void {
    this.propertiesService.getProperties(this.url).subscribe(response => {
      this.data = response;
    });

    setTimeout(() => {
      this.getProperties('data');
      this.getPaginationLinks('links');
      this.getUrl();
    }, 400);
  }
}
