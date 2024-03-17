import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Person } from 'src/app/interfaces/person';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() result: Person[] = [];


}
