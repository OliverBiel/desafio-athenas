import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() result: Person[] = [];
  selectedPerson: Person = {} as Person;
  showModal: boolean = false;

  constructor(private apiService: ApiService) {
  }

  // ngOnChanges() {
    
  // }

  edit(person: Person) {
    this.selectedPerson = person;
    this.showModal = true;
  };
  delete(person: Person) {
    this.apiService.delete(`pessoa/delete/${person.id}/`).subscribe(() => {
      this.result = this.result.filter((p) => p.id !== person.id);
    });
  };
  calculate(person: Person) {
    console.log(person);
  };

  closeModal() {
    // Muda o valor da variável, fecha o modal e refaz a busca
    this.showModal = false;
    this.selectedPerson = {} as Person;
    console.log('closeModal');
  }
}
