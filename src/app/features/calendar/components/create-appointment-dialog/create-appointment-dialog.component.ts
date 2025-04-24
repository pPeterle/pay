import { Component, OnInit } from '@angular/core';
import { AppointmentModel } from 'src/app/core/model/appointment.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-create-appointment-dialog',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.css'],
})
export class CreateAppointmentDialogComponent implements OnInit {
  appointmentForm!: FormGroup<{
    title: FormControl<string | null>;
    date: FormControl<Date | null>;
    time: FormControl<string | null>;
  }>;

  constructor(
    private dialogRef: MatDialogRef<AppointmentModel>,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      time: new FormControl('', [Validators.required]),
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

    const appointment = {
      title,
      date,
    };
    this.appointmentService.createAppointment(appointment);
    this.dialogRef.close();
  }
}
