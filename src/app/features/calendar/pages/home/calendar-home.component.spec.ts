import { AppointmentService } from 'src/app/core/services/appointment.service';
import { CalendarHomeComponent } from './calendar-home.component';
import { AppointmentModel } from 'src/app/core/model/appointment.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { CalendarModule } from '../../calendar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { CreateAppointmentDialogComponent } from '../../components/create-appointment-dialog/create-appointment-dialog.component';
import { of } from 'rxjs';

describe('CalendarHomeComponent', () => {
  let component: CalendarHomeComponent;
  let fixture: ComponentFixture<CalendarHomeComponent>;
  let DialogSpy: jasmine.SpyObj<MatDialog>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;

  const appointment1: AppointmentModel = {
    id: 1,
    title: 'Meeting',
    date: new Date('2023-04-02T15:00:00'),
  };
  const appointment2: AppointmentModel = {
    id: 2,
    title: 'Lunch',
    date: new Date('2023-04-05T20:00:00'),
  };

  beforeEach(async () => {
    DialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    appointmentServiceSpy = jasmine.createSpyObj(
      'AppointmentService',
      ['deleteAppointment'],
      {
        appointments$: of([appointment1, appointment2]),
      }
    );

    await TestBed.configureTestingModule({
      declarations: [CalendarHomeComponent],
      imports: [CalendarModule, BrowserAnimationsModule, MatNativeDateModule],
      providers: [
        { provide: MatDialog, useValue: DialogSpy },
        { provide: AppointmentService, useValue: appointmentServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open drawer and show animation when menu button is clicked', () => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="menu-button"]')
    );
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const drawer = fixture.debugElement.query(By.css('[data-testid="drawer"]'));
    expect(drawer).toBeTruthy();
  });

  it('should open CreateAppointmentDialogComponent when openDialog() is called', () => {
    component.openDialog();
    expect(DialogSpy.open).toHaveBeenCalledOnceWith(
      CreateAppointmentDialogComponent
    );
  });

  it('should update appointmentsByHour when selectedDate changes', () => {
    component.selectDate(new Date('2023-04-02T15:00:00'));
    expect(component.appointmentsByHour['0'].length).toBe(0);
    expect(component.appointmentsByHour['15'].length).toBe(1);

    component.selectDate(new Date('2023-04-05T20:00:00'));
    expect(component.appointmentsByHour['10'].length).toBe(0);
    expect(component.appointmentsByHour['20'].length).toBe(1);
  });

  it('should delete appointment when call removeAppointment()', () => {
    component.removeAppointment(appointment1);

    expect(appointmentServiceSpy.deleteAppointment).toHaveBeenCalledOnceWith(
      appointment1
    );
  });
});
