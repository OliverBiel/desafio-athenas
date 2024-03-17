import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Person } from 'src/app/interfaces/person';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() result: Person[] = [{
        id: "783337e4-a183-4966-831a-5c9ea83b4a75",
        nome: "Gabriel",
        dt_nascimento: "2002-02-23",
        cpf: "041.546.487-71",
        sexo: "M",
        altura: 1.80,
        peso: 85.80
    }];

  edit(person: Person) {
    console.log(person);
  };
  delete(person: Person) {
    console.log(person);
  };
  calculate(person: Person) {
    console.log(person);
  };
}
