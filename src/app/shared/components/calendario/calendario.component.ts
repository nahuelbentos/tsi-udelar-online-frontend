import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  Calendar,
  CalendarOptions,
  EventAddArg,
  EventApi,
  EventInput,
  formatDate,
} from '@fullcalendar/angular';
import { Actividad } from 'src/app/models/actividad.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {
  eventGuid = 0;


  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();

  // eventAddArg : EventAddArg;
  currentEvents: EventApi[] = [];
  events = [];

  calendarOptions: CalendarOptions;

  constructor(
    private actividadService: ActividadService,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.actividadService
      .getActividadesByAlumno(this.usuarioLogueado.id)
      .subscribe((actividades) => this.setCalendario(actividades));
  }

  setCalendario(actividades: Actividad[]) {
    this.events = actividades.map((element) => ({
      title: element.nombre,
      date: element.fechaFinalizada,
    }));
    console.log('events ', this.events);

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locales: [esLocale],
      events: this.events,
    };
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

  createEventId() {
    return String(this.eventGuid++);
  }
}
