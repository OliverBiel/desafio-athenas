import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Person } from 'src/app/interfaces/person';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  constructor(
    private apiService: ApiService
  ) { }
  
  @Output() result = new EventEmitter<Person[]>();

  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
  });

  isValid: boolean = false;

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      this.isValid = this.searchForm.valid;
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.apiService.getData(`pessoa/?search=${this.searchForm.value.search}`).subscribe((data: any) => {
        this.result.emit(data);
      });
    }
  }

}
