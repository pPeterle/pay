import { Component, Inject, OnInit } from '@angular/core';
import { AppointmentModel } from 'src/app/core/model/appointment.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { DeleteAppointmentDialogComponent } from '../delete-appointment-dialog/delete-appointment-dialog.component';

@Component({
  selector: 'app-update-appointment-dialog',
  templateUrl: './update-appointment-dialog.component.html',
  styleUrls: ['./update-appointment-dialog.component.css'],
})
export class UpdateAppointmentDialogComponent implements OnInit {
  appointmentForm!: FormGroup<{
    title: FormControl<string | null>;
    date: FormControl<Date | null>;
    time: FormControl<string | null>;
  }>;

  constructor(
    public dialogRef: MatDialogRef<AppointmentModel>,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentModel,
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const hours = this.data.date.getHours();
    const minutes = this.data.date.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    this.appointmentForm = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required]),
      date: new FormControl(this.data.date, [Validators.required]),
      time: new FormControl(time, [Validators.required]),
    });
  }

  submit(): void {
    if (this.appointmentForm.invalid) {
      return;
    }

    const { title, date, time } = this.appointmentForm.value as {
      title: string;
      date: Date;
      time: string;
    };

    const [hours, minutes] = time.split(':');

    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    const appointment: AppointmentModel = {
      title,
      date,
      id: this.data.id,
    };
    this.appointmentService.updateAppointment(appointment);

    this.dialogRef.close();
  }

  openDeleteDialog() :void {
    this.dialog.open(DeleteAppointmentDialogComponent, {
      data: this.data
    })
  }
}
