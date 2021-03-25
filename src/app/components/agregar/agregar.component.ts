import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  //contiene la referencia al objeto con el formulario reactivo
  formularioCreado!: FormGroup;
  //lista de usuario registrados
  listaUsuarios: Array<Usuario> = new Array<Usuario>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //llamar el método para crear el formulario
    this.crearFormulario();
  }

  //metodo para cargar ek formulario reactivo
  crearFormulario() {
    //usar el objeto formbuilder para crear el formulario
    this.formularioCreado = this.formBuilder.group(
      {
        nombre: ['John', Validators.required],
        correo: ['', Validators.compose([Validators.required, Validators.email])],
        contraseña: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }

    );

  }
  agregar() {
    //Obtener los valores ingresados en los controles
    console.log(this.formularioCreado.value);


  }

}

interface Usuario {
  nombre: string;
  correo: string;
  contraseña: string;
}