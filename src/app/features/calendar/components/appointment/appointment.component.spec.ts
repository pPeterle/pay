import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppointmentComponent } from './appointment.component';
import { AppointmentModel } from 'src/app/core/model/appointment.model';
import { UpdateAppointmentDialogComponent } from '../update-appointment-dialog/update-appointment-dialog.component';
import { By } from '@angular/platform-browser';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event', () => {
    spyOn(component.closeEvent, 'emit');
    component.closeEvent.emit();
    expect(component.closeEvent.emit).toHaveBeenCalled();
  });

  it('should open update appointment dialog', () => {
    spyOn(dialog, 'open');
    const appointment: AppointmentModel = {
      date: new Date(),
      title: 'Test Appointment',
      id: Date.now(),
    };
    component.appointment = appointment;
    fixture.detectChanges();
    const appointmentDiv = fixture.debugElement.query(By.css('.appointment'));
    appointmentDiv.triggerEventHandler('click', null);
    expect(dialog.open).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalledWith(UpdateAppointmentDialogComponent, {
      data: appointment,
    });
  });

  it('should format the text correctly', () => {
    const appointment: AppointmentModel = {
      date: new Date('2023-05-01T12:00:00Z'),
      title: 'Test Appointment',
      id: Date.now(),
    };
    component.appointment = appointment;

    fixture.detectChanges();
    const appointmentP = fixture.debugElement.query(
      By.css('[data-testid="appointment-text"]')
    );

    expect(appointmentP.nativeElement.textContent).toEqual(
      '09:00 - Test Appointment'
    );
  });
});
