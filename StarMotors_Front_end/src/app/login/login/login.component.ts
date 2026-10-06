import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpeladoControllerService } from 'app/Services/SQL/angular_api_client';
import { TblEmpleado } from '../../Services/SQL/angular_api_client/model/tblEmpleado';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  //variable para poder hcer uso del logueo
  usuario :TblEmpleado ={}

  //variable declarada para validar los menus
  isLogged = false;
   
 constructor(private router: Router, private empleadoService : EmpeladoControllerService) {
  
  // variables inicializadas 
   this.usuario.persona= {};
   this.usuario.roles = {};
   
  }

  ngOnInit(): void {
  
  }

  loggin(){

    // metodo para el logueo
    this.empleadoService.findEmpleadoByUsernameAndPasswordUsingGET(this.usuario.empPassword,this.usuario.empUsername).subscribe(data => {
        
      this.isLogged = true;
    
    // guardamos los datos para las validaciones en el
    // localStorage
    localStorage.setItem("idEmpleado", data.idEmpleado.toString());
    localStorage.setItem("rol", data.roles.rolNombre);
    localStorage.setItem("btn", this.isLogged.toString());
    
    this.router.navigate(['#']);
    location.reload();

  },(error) => {

    //capturamos el error del logueo
    // y lanzamos un mensaje
    this.ShowDialogErr();
 
  });
  
    
  }

  // dialog para la validacion del error
  ShowDialogErr() {
    Swal.fire({
      icon: 'error',
      title: 'Revise sus Credenciales',
      text: 'Autenticacón Fallida!',
    })
  }
  
}
