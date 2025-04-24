import { Injectable } from '@angular/core';
import { AppointmentModel } from '../model/appointment.model';

const APPOINTMENTS_KEY = 'appointmentsKey';

type AppointmentJson = {
  title: string;
  date: string;
  id: number;
};

@Injectable()
export class LocalStorageDatabase {
  saveAppointments(appointments: AppointmentModel[]): void {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  }

  getAllAppointments(): AppointmentModel[] {
    const json = localStorage.getItem(APPOINTMENTS_KEY);
    if (json) {
      const appointmentsJson: AppointmentJson[] = JSON.parse(json);
      return appointmentsJson.map((appointment) => ({
        id: appointment.id,
        date: new Date(appointment.date),
        title: appointment.title
      }));
    } else return [];
  }
}
