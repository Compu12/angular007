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
  //determina si se desea realizar "Agregar o EDITAR"
  esNuevo: boolean = true;

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
    this.listaUsuarios.push(this.formularioCreado.value as Usuario);
    //limpiar o resetear los controles del formulario
    this.formularioCreado.reset();


  }

  editar() {

  }

  editarUsuarioActual(pos: number) {
    this.formularioCreado.setValue(
      {
        nombre: this.listaUsuarios[pos].nombre,
        correo: this.listaUsuarios[pos].correo,
        contraseña: this.listaUsuarios[pos].contraseña
      }
    );
    this.esNuevo=false;

  }

}

interface Usuario {
  nombre: string;
  correo: string;
  contraseña: string;
}