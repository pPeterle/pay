import { AppointmentModel } from '../model/appointment.model';
import { LocalStorageDatabase } from './local-storage-database.service';

describe('Local Storage Database', () => {
  let localStorageDatabase: LocalStorageDatabase;

  const appointment1: AppointmentModel = {
    id: 1,
    title: 'Meeting',
    date: new Date('2023-05-01T10:00:00Z'),
  };
  const appointment2: AppointmentModel = {
    id: 2,
    title: 'Lunch',
    date: new Date('2023-05-01T12:00:00Z'),
  };

  beforeEach(() => {
    localStorageDatabase = new LocalStorageDatabase();
  });

  describe('saveAppointments', () => {
    it('should save an appointment', () => {
      spyOn(localStorage, 'setItem');

      localStorageDatabase.saveAppointments([appointment1, appointment2]);

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('getAllAppointments', () => {
    it('should return an empty array when localStorage is empty', () => {
      spyOn(localStorage, 'getItem').and.returnValue('');
      expect(localStorageDatabase.getAllAppointments()).toEqual([]);
    });

    it('should return an array of AppointmentModels when localStorage has appointments', () => {
      const appointments = [appointment1, appointment2];
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify(appointments)
      );

      const result = localStorageDatabase.getAllAppointments();

      expect(localStorage.getItem).toHaveBeenCalled();
      expect(result).toEqual(appointments);
    });
  });
});
