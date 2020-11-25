import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { RutasNav } from 'src/app/models/rutas-nav.interface';
import { ActivationEnd, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-nav-custom',
  templateUrl: './nav-custom.component.html',
  styleUrls: ['./nav-custom.component.scss'],
})
export class NavCustomComponent implements OnInit, OnDestroy {
  @Input() routes: RutasNav[] = [];
  @Input() rol: string;

  public titulo: string;
  public tituloSubs$: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private auth: AutenticacionService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.tituloSubs$ = this.getDataRuta().subscribe((data) => {
      this.titulo = data.titulo;
      document.title = `UdelarOnline - ${data.titulo}`;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getDataRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  logout = () => this.auth.logout();
}
