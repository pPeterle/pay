import { LocalStorageDatabase } from '../database/local-storage-database.service';
import { AppointmentModel } from '../model/appointment.model';
import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let localStorageDatabaseSpy: LocalStorageDatabase;

  beforeEach(() => {
    localStorageDatabaseSpy = {
      getAllAppointments: jasmine.createSpy().and.returnValue([]),
      saveAppointments: jasmine.createSpy(),
    };

    service = new AppointmentService(localStorageDatabaseSpy);
    jasmine.createSpyObj;
  });

  describe('createAppointment', () => {
    it('should add a new appointment to the list of appointments', () => {
      const title = 'Test Appointment';
      const date = new Date();

      service.createAppointment({ title, date });

      service.appointments$.subscribe((appointments: AppointmentModel[]) => {
        expect(appointments.length).toBe(1);
        expect(appointments[0].title).toBe(title);
        expect(appointments[0].date).toEqual(date);
      });

      expect(localStorageDatabaseSpy.saveAppointments).toHaveBeenCalled();
    });
  });

  describe('updateAppointment', () => {
    it('should update an existing appointment in the list of appointments', () => {
      let appointmentsList: AppointmentModel[] = [];
      service.appointments$.subscribe((appointments: AppointmentModel[]) => {
        appointmentsList = appointments;
      });

      const appointment = {
        title: 'Test Appointment',
        date: new Date(),
      };
      service.createAppointment(appointment);


      const updatedAppointment: AppointmentModel = {
        title: 'Updated Appointment',
        date: new Date(),
        id: appointmentsList[0].id,
      };

      service.updateAppointment(updatedAppointment);

      expect(appointmentsList[0].title).toEqual(updatedAppointment.title);
      
      expect(localStorageDatabaseSpy.saveAppointments).toHaveBeenCalled()
    });
  });

  describe('deleteAppointment', () => {
    it('should remove an existing appointment from the list of appointments', () => {
      let appointmentsList: AppointmentModel[] = [];
      service.appointments$.subscribe((appointments: AppointmentModel[]) => {
        appointmentsList = appointments;
      });

      const appointment = {
        title: 'Test Appointment',
        date: new Date(),
      };
      service.createAppointment(appointment);

      service.deleteAppointment(appointmentsList[0]);

      service.appointments$.subscribe((appointments: AppointmentModel[]) => {
        expect(appointments.length).toBe(0);
      });
    });
  });
});
