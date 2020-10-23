import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/autenticacion/pages/login/login.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500',
      data: {
        msg: 'Hola',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed: ', result);
    });

    // Swal.fire({
    //   title: 'Login',
    //   icon: 'info',
    //   html:
    //     '<input id="email" type="email" class="swal2-input" #email>' +
    //     '<input id="password" type="password" class="swal2-input" #password>',
    //   preConfirm: () => ({
    //     email: document.getElementById('email').value,
    //     password: document.getElementById('password').value,
    //   }),
    // }).then((res) => console.log(res));
  }
}
