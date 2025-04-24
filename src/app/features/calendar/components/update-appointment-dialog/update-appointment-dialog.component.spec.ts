import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { UpdateAppointmentDialogComponent } from './update-appointment-dialog.component';
import { DeleteAppointmentDialogComponent } from '../delete-appointment-dialog/delete-appointment-dialog.component';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentModel } from 'src/app/core/model/appointment.model';

describe('UpdateAppointmentDialogComponent', () => {
  let component: UpdateAppointmentDialogComponent;
  let fixture: ComponentFixture<UpdateAppointmentDialogComponent>;
  let dialogRef: MatDialogRef<UpdateAppointmentDialogComponent>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AppointmentModel>>;

  beforeEach(async () => {
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', [
      'updateAppointment',
    ]);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [UpdateAppointmentDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAppointmentDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    component.data = { id: 1, title: 'Test Appointment', date: new Date() };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with the correct initial values', () => {
    expect(component.appointmentForm.value).toEqual({
      title: 'Test Appointment',
      date: component.data.date,
      time: jasmine.any(String),
    });
  });

  describe('submit', () => {
    it('should update the appointment and close the dialog when submit is called with a valid form', () => {
      const formValue = {
        title: 'New Appointment Title',
        date: new Date('2023-04-02T10:00:00'),
        time: '10:00',
      };
  
      component.appointmentForm.setValue(formValue);
  
      appointmentServiceSpy.updateAppointment.and.returnValue();
      component.submit();
  
      expect(appointmentServiceSpy.updateAppointment).toHaveBeenCalledWith({
        id: component.data.id,
        title: formValue.title,
        date: formValue.date,
      });
      expect(dialogRef.close).toHaveBeenCalled();
    });
  
    it('should not update the appointment or close the dialog when submit is called with an invalid form', () => {
      const formValue = {
        title: '',
        date: null,
        time: null,
      };
  
      component.appointmentForm.setValue(formValue);
  
      appointmentServiceSpy.updateAppointment.and.returnValue();
      component.submit();
  
      expect(appointmentServiceSpy.updateAppointment).not.toHaveBeenCalled();
      expect(dialogRef.close).not.toHaveBeenCalled();
    });
  })

  it('should open the delete appointment dialog when openDeleteDialog is called', () => {
    component.openDeleteDialog();
    expect(dialogSpy.open).toHaveBeenCalledWith(
      DeleteAppointmentDialogComponent,
      {
        data: component.data,
      }
    );
  });
});
