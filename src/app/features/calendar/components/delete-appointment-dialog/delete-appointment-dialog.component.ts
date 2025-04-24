import { Component, Inject } from '@angular/core';
import { AppointmentModel } from 'src/app/core/model/appointment.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-delete-appointment-dialog',
  templateUrl: './delete-appointment-dialog.component.html',
  styleUrls: ['./delete-appointment-dialog.component.css'],
})
export class DeleteAppointmentDialogComponent {
  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentModel
  ) {}

  deleteAppointment(): void {
    this.appointmentService.deleteAppointment(this.data);
    this.dialog.closeAll();
  }
}
