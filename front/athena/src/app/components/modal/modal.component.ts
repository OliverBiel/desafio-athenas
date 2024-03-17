import { Component, Input } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { ApiService } from 'src/app/services/api.service';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    private apiService: ApiService
  ) { }

  personForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    dt_nascimento: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
    peso: new FormControl('', [Validators.required]),
    altura: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
  });

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
      });
    } else {
      this.apiService.postData('pessoa/create/', this.person).subscribe(() => {
        alert('Pessoa cadastrada com sucesso!');
        this.close();
      });
    }
  }

  close() {
    this.person = {} as Person;
    this.closeModal.emit(true);
  } 
}
