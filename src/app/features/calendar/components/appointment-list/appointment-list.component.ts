import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AppointmentModel,
  AppointmentsByHour,
} from 'src/app/core/model/appointment.model';
import {
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent {
  @Input() appointmentsByHour: AppointmentsByHour = {};

  @Output() deletedAppointmentEvent = new EventEmitter<AppointmentModel>();

  constructor(private appointmentService: AppointmentService) {}

  get apointmentsKeys(): string[] {
    return Object.keys(this.appointmentsByHour);
  }

  drop(event: CdkDragDrop<AppointmentModel[]>): void {
    if (event.previousContainer.id === event.container.id) return;

    const previousHour = event.previousContainer.id;
    const actualHour = event.container.id;

    const appointment = this.appointmentsByHour[previousHour][event.previousIndex];
    
    appointment.date.setHours(Number(actualHour));
    this.appointmentService.updateAppointment(appointment);
  }

  removeAppointment(deletedAppointment: AppointmentModel): void {
    this.deletedAppointmentEvent.emit(deletedAppointment);
  }
}
