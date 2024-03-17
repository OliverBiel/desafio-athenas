import { Component, Input } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { ApiService } from 'src/app/services/api.service';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() person: Person = {} as Person;
  @Input() title: string = 'Informações da Pessoa';
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  isValid: boolean = false;

  personForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    dt_nascimento: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14), Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$')]),
    peso: new FormControl('', [Validators.required]),
    altura: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.personForm.valueChanges.subscribe(() => {
      this.isValid = this.personForm.valid;
    });

  }

  ngOnChanges(): void {
    this.personForm.setValue({
      nome: this.person.nome || '',
      dt_nascimento: this.person.dt_nascimento || '',
      cpf: this.person.cpf || '',
      peso: String(this.person.peso) || '',
      altura: String(this.person.altura) || '',
      sexo: this.person.sexo || '',
    });
  }
  
  save() {
    if (this.person.id) {
      this.apiService.putData('pessoa/update/' + this.person.id + '/', this.personForm.value).subscribe(() => {
        alert('Pessoa atualizada com sucesso!');
        this.close();
        this.router.navigate(['/'],
        {
          queryParams: { search: this.personForm.value.cpf }
        });
      });
    } else {
      // Formata a data para o formato aceito pelo backend (YYYY-MM-DD)
      let formattedDate = new Date(this.personForm.value.dt_nascimento!);

      this.personForm.value.dt_nascimento = formattedDate.toISOString().split('T')[0];
      console.log(this.personForm.value.dt_nascimento);

      this.apiService.postData('pessoa/create/', this.personForm.value).subscribe(() => {
        alert('Pessoa cadastrada com sucesso!');
        this.close();
        this.router.navigate(['/'],
        {
          queryParams: { search: this.personForm.value.cpf }
        });
      });
    }
  }

  close() {
    this.person = {} as Person;
    this.closeModal.emit(true);
  } 
}
