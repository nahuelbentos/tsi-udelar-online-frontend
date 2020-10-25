import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {
        msg: 'Hola',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed: ', result);
      this.router.navigate(['/administrador']);
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
