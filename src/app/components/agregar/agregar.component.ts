import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
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
  posicionEdicion: number;

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
        nombre: ['John', [Validators.required, Validators.pattern(/^[A-ZÑ]+$/i), Validators.maxLength(20)]],
        apellido: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-ZÑ]+$/i)]],
        edad: ['', [Validators.required, Validators.maxLength(2), Validators.pattern(/^[1-9]/)]],
        correo: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(30)])],
        pass: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/.*\d[A-Za-z]*/)])]
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
    this.listaUsuarios[this.posicionEdicion].nombre = this.formularioCreado.value.nombre;
    this.listaUsuarios[this.posicionEdicion].apellido = this.formularioCreado.value.apellido;
    this.listaUsuarios[this.posicionEdicion].edad = this.formularioCreado.value.edad;
    this.listaUsuarios[this.posicionEdicion].correo = this.formularioCreado.value.correo;
    this.listaUsuarios[this.posicionEdicion].pass = this.formularioCreado.value.pass;
    this.formularioCreado.reset();
    this.esNuevo = true;

    // Cambiar la posicion del registro actual a editar
    this.posicionEdicion = -1;

  }

  editarUsuarioActual(pos: number) {
    this.formularioCreado.setValue(
      {
        nombre: this.listaUsuarios[pos].nombre,
        apellido: this.listaUsuarios[pos].apellido,
        edad: this.listaUsuarios[pos].edad,
        correo: this.listaUsuarios[pos].correo,
        pass: this.listaUsuarios[pos].pass
      }
    );
    this.esNuevo = false;
    this.posicionEdicion = pos;

  }

  // Eliminar registro actual
  eliminarUsusarioActual(posicion: number) {
    // Eliminar el registro del Array
    this.listaUsuarios.splice(posicion, 1);
  }


}

interface Usuario {
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  pass: string;
}