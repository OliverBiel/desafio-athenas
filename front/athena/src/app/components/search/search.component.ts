import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Person } from 'src/app/interfaces/person';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  @Input() search: string|undefined = undefined;
  @Output() result = new EventEmitter<Person[]>();

  
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
  });
  
  isValid: boolean = false;
  
  ngOnInit(): void {
    if (this.search) {
      this.searchForm.setValue({ search: this.search });
      this.onSubmit();
    }

    this.searchForm.valueChanges.subscribe((value) => {
      this.isValid = this.searchForm.valid;
      this.router.navigate([], {
        queryParams: { search: value.search },
        queryParamsHandling: 'merge'
      });
    });

  }

  ngOnChanges(): void {
    if (this.search) {
      this.searchForm.setValue({ search: this.search });
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.apiService.getData(`pessoa/?search=${this.searchForm.value.search}`).subscribe((data: any) => {
        this.result.emit(data);
      });
    }
  }

}
