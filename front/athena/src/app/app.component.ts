import { Component } from '@angular/core';
import { Person } from './interfaces/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'athena';

  result: Person[] = [];
  showModal: boolean = false;
  
  setResult(data: Person[]) {
    this.result = data;
  }

  toggleModal () {
    this.showModal = !this.showModal;
  }
}
