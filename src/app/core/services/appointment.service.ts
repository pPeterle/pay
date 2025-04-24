import { Injectable } from '@angular/core';
import { LocalStorageDatabase } from '../database/local-storage-database.service';
import { AppointmentModel } from '../model/appointment.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable()
export class AppointmentService {
  private appointmentsSubject = new BehaviorSubject<AppointmentModel[]>([]);

  get appointments$(): Observable<AppointmentModel[]> {
    return this.appointmentsSubject.pipe(
      tap(this.localStorage.saveAppointments)
    );
  }

  private get appointments(): AppointmentModel[] {
    return this.appointmentsSubject.value;
  }

  constructor(private localStorage: LocalStorageDatabase) {
    const appointments = localStorage.getAllAppointments();

    this.appointmentsSubject.next(appointments);
  }

  createAppointment({ title, date }: { title: string; date: Date }): void {
    const appointment: AppointmentModel = {
      date,
      id: Date.now(),
      title,
    };

    this.appointments.push(appointment);

    this.appointmentsSubject.next(this.appointments);
  }

  updateAppointment(updatedAppointment: AppointmentModel): void {
    const index = this.appointments.findIndex(
      (appointment) => updatedAppointment.id === appointment.id
    );
    console.log(this.appointments);
    this.appointments[index] = updatedAppointment;

    this.appointmentsSubject.next(this.appointments);
  }

  deleteAppointment(deletedAppointment: AppointmentModel): void {
    const appointments = this.appointmentsSubject.value;

    const filteredAppointments = appointments.filter((appointment) => {
      return appointment.id !== deletedAppointment.id;
    });

    this.appointmentsSubject.next(filteredAppointments);
  }
}
