import { Component, OnInit  } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CountriesService } from '../services/countries/countries.service';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit  {
  // Propiedades de la clase
    title: string = '¿QUÉ ESPERAS PARA CUMPLIR TU SUEÑO?';
    subTitle: string = 'Deja tus datos y nos comunicaremos contigo.';
    ngForm: FormGroup;
    countriesOptions: any;

    // Metodos
    constructor(private fb: FormBuilder, private countries: CountriesService) {
      this.createForm();
    }

    ngOnInit(){
      this.countries.getCountries().subscribe( (response) => {
        this.countriesOptions = response;
      })
    }
   
    createForm() {
      this.ngForm = this.fb.group({
        fullName: ['', [
          Validators.required,
          Validators.pattern('^[\u00F1A-Za-záéíóúÁÉÍÓÚ _]*[\u00F1A-Za-záéíóúÁÉÍÓÚ][\u00F1A-Za-záéíóúÁÉÍÓÚ _]*$') //Validación con una expresión regular que acepte solo texto, algunos acentos y 'ñÑ'
        ]],
        documentType: ['', Validators.required],
        document: ['', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$') //Validación con una expresión regular que acepte solo numeros
        ]],
        country: ['', Validators.required],
        phoneNumber: ['', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]],
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        accept: [false, Validators.pattern('true')] //Validación con una expresión regular que acepte solo valores true (el checkbox)
      });
    }

    onSubmit() {
      if (this.ngForm.invalid) {
          return;
      }
      alert('Datos del formulario!!\n\n' + JSON.stringify(this.ngForm.value, null, 4));
  }

}
