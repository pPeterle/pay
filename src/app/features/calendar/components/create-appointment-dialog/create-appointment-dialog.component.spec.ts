import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CreateAppointmentDialogComponent } from "./create-appointment-dialog.component";
import { MatDialogRef } from "@angular/material/dialog";
import { AppointmentService } from "src/app/core/services/appointment.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CalendarModule } from "../../calendar.module";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('CreateAppointmentDialogComponent', () => {
    let component: CreateAppointmentDialogComponent;
    let fixture: ComponentFixture<CreateAppointmentDialogComponent>;
    let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
    let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CreateAppointmentDialogComponent>>;
  
    beforeEach(async () => {
      appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['createAppointment']);
      dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  
      await TestBed.configureTestingModule({
        declarations: [CreateAppointmentDialogComponent],
        imports: [
            FormsModule,
            ReactiveFormsModule,
            MatInputModule,
            MatDatepickerModule,
            MatNativeDateModule,
            CalendarModule,
            BrowserAnimationsModule
        ],
        providers: [
          { provide: MatDialogRef, useValue: dialogRefSpy },
          { provide: AppointmentService, useValue: appointmentServiceSpy },
        ],
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(CreateAppointmentDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    describe('submit', () => {
      it('should create an appointment', () => {
        const appointment = {
          title: 'Test Appointment',
          date: new Date('2023-04-02T09:00:00'),
        };
        component.appointmentForm.setValue({
          title: appointment.title,
          date: appointment.date,
          time: '09:00',
        });
        appointmentServiceSpy.createAppointment.and.returnValue();
  
        component.submit();
  
        expect(appointmentServiceSpy.createAppointment).toHaveBeenCalledWith(appointment);
        expect(dialogRefSpy.close).toHaveBeenCalled();
      });
  
      it('should not create an appointment if form is invalid', () => {
        component.appointmentForm.setValue({
          title: '',
          date: null,
          time: '',
        });
  
        component.submit();
  
        expect(appointmentServiceSpy.createAppointment).not.toHaveBeenCalled();
        expect(dialogRefSpy.close).not.toHaveBeenCalled();
      });
    });
  });