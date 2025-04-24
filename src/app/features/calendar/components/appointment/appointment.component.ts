import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentModel } from 'src/app/core/model/appointment.model';
import { UpdateAppointmentDialogComponent } from '../update-appointment-dialog/update-appointment-dialog.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent {
  @Input() appointment!: AppointmentModel;

  @Output() closeEvent = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  openAppointment() {
    this.dialog.open(UpdateAppointmentDialogComponent, {
      data: this.appointment
    });
  }
}
