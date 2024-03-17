import { Component } from '@angular/core';
import { Person } from './interfaces/person';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
    private route: ActivatedRoute,
    private api: ApiService,
    ) {}

  title = 'athena';

  result: Person[] = [];
  showModal: boolean = false;
  search: string = '';
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.search = params['search'];
    });

    this.api.getData("pessoa/").subscribe((data: any) => {
      this.setResult(data);
    });
  }

  setResult(data: Person[]) {
    this.result = data;
  }

  toggleModal () {
    this.showModal = !this.showModal;
  }
}
