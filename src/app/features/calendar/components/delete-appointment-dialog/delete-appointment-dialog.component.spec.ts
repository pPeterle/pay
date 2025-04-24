import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeleteAppointmentDialogComponent } from './delete-appointment-dialog.component';
import { By } from '@angular/platform-browser';
import { AppointmentService } from 'src/app/core/services/appointment.service';

describe('DeleteAppointmentDialogComponent', () => {
  let component: DeleteAppointmentDialogComponent;
  let fixture: ComponentFixture<DeleteAppointmentDialogComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll']);
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['deleteAppointment']);
    await TestBed.configureTestingModule({
      declarations: [DeleteAppointmentDialogComponent],
      providers: [
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: MatDialog, useValue: dialogSpy},
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Appointment', date: new Date(), id: 123 } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete the appointment when click on button', () => {
    const button = fixture.debugElement.query(
        By.css('[data-testid="delete-appointment"]')
      );
    button.triggerEventHandler('click', null);
    
    expect(appointmentServiceSpy.deleteAppointment).toHaveBeenCalledWith(component.data);
    expect(dialogSpy.closeAll).toHaveBeenCalled();
  });
});