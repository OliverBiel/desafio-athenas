import { Component } from '@angular/core';
import { Person } from './interfaces/person';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (private router: Router,
    private route: ActivatedRoute) {}

  title = 'athena';

  result: Person[] = [];
  showModal: boolean = false;
  search: string = '';
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.search = params['search'];
    });
  }

  setResult(data: Person[]) {
    this.result = data;
  }

  toggleModal () {
    this.showModal = !this.showModal;
  }
}
