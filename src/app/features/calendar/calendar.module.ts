import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CalendarHomeComponent } from './pages/home/calendar-home.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateAppointmentDialogComponent } from './components/create-appointment-dialog/create-appointment-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormatHourPipe } from './pipes/format-hour.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UpdateAppointmentDialogComponent } from './components/update-appointment-dialog/update-appointment-dialog.component';
import { DeleteAppointmentDialogComponent } from './components/delete-appointment-dialog/delete-appointment-dialog.component';

@NgModule({
  declarations: [
    CalendarHomeComponent,
    CreateAppointmentDialogComponent,
    AppointmentComponent,
    AppointmentListComponent,
    UpdateAppointmentDialogComponent,
    FormatHourPipe,
    DeleteAppointmentDialogComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    CalendarRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDatepickerModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule
  ],
})
export class CalendarModule {}
