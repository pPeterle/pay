import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentListComponent } from './appointment-list.component';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import {
  AppointmentModel,
  AppointmentsByHour,
} from 'src/app/core/model/appointment.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('AppointmentListComponent', () => {
  let component: AppointmentListComponent;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let fixture: ComponentFixture<AppointmentListComponent>;

  const appointmentsByHour: AppointmentsByHour = {
    '0': [
      {
        id: 1,
        title: 'Meeting',
        date: new Date('2023-04-02T15:00:00'),
      },
    ],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': [],
    '10': [],
    '11': [],
    '12': [],
    '13': [],
    '14': [],
    '15': [],
    '16': [],
    '17': [],
    '18': [],
    '19': [],
    '20': [],
    '21': [],
    '22': [],
    '23': [],
  };

  beforeEach(async () => {
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', [
      'updateAppointment',
    ]);
    await TestBed.configureTestingModule({
      declarations: [AppointmentListComponent],
      providers: [
        { provide: AppointmentService, useValue: appointmentServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deletedAppointmentEvent', () => {
    const appointment: AppointmentModel = {
      id: 1,
      title: 'Appointment 1',
      date: new Date(),
    };
    const emitterSpy = spyOn(component.deletedAppointmentEvent, 'emit');

    component.removeAppointment(appointment);

    expect(emitterSpy).toHaveBeenCalledWith(appointment);
  });

  describe('drag and drop', () => {
    it('should update appointment on drop', () => {
      component.appointmentsByHour = appointmentsByHour;

      const event: CdkDragDrop<AppointmentModel[]> = {
        previousContainer: { id: '0' } as never,
        container: { id: '1' } as never,
        previousIndex: 0,
        currentIndex: 0,
        item: null as never,
        distance: null as never,
        dropPoint: null as never,
        isPointerOverContainer: false,
        event: new MouseEvent(''),
      };
      component.drop(event);

      const updatedAppointment: AppointmentModel = {
        id: 1,
        title: 'Meeting',
        date: new Date('2023-04-02T01:00:00'),
      };
      expect(appointmentServiceSpy.updateAppointment).toHaveBeenCalledOnceWith(
        updatedAppointment
      );
    });

    it('should not update appointment when event is in the same container', () => {
      component.appointmentsByHour = appointmentsByHour;

      const event: CdkDragDrop<AppointmentModel[]> = {
        previousContainer: { id: '0' } as never,
        container: { id: '0' } as never,
        previousIndex: 0,
        currentIndex: 0,
        item: null as never,
        distance: null as never,
        dropPoint: null as never,
        isPointerOverContainer: false,
        event: new MouseEvent(''),
      };
      component.drop(event);

      expect(appointmentServiceSpy.updateAppointment).toHaveBeenCalledTimes(0);
    });
  });
});
