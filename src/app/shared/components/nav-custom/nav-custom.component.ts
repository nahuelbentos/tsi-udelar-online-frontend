import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { RutasNav } from 'src/app/models/rutas-nav.interface';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { FormControl } from '@angular/forms';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';

@Component({
  selector: 'app-nav-custom',
  templateUrl: './nav-custom.component.html',
  styleUrls: ['./nav-custom.component.scss'],
})
export class NavCustomComponent implements OnInit, OnDestroy, OnChanges {
  @Input() routes: RutasNav[] = [];
  @Input() rol: string;
  @Input() color: string;

  @Input() verBuscar = false;

  public titulo: string;
  public tituloSubs$: Subscription;
  values = '';

  searchCursos = new FormControl('');

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private auth: AutenticacionService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tituloSubs$ = this.getDataRuta().subscribe((data) => {
      this.titulo = data.titulo;
      document.title = `UdelarOnline - ${data.titulo}`;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.color) {
      this.color = changes.color.currentValue;
    }
    if (changes.verBuscar) {
      this.verBuscar = changes.verBuscar.currentValue;
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  onKey(event: any) {
    console.log('event :: ', event);
    console.log('searchCursos :: ', this.searchCursos.value);

    this.router.navigate([`explorar-cursos`], {
      queryParams: { search: this.searchCursos.value },
      relativeTo: this.route,
    });


  }
  getDataRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  logout = () => this.auth.logout();

  getBackgroundColor() {
    const color = this.auth.getUser().facultad.colorCodigo
      ? `#${this.auth.getUser().facultad.colorCodigo}`
      : `#00a9f4`;

    return of(color);
  }
}
