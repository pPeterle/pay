import { Component, OnDestroy, OnInit } from '@angular/core';

import { CreateAppointmentDialogComponent } from '../../components/create-appointment-dialog/create-appointment-dialog.component';
import {
  AppointmentModel,
  AppointmentsByHour,
} from '../../../../core/model/appointment.model';
import {
  BehaviorSubject,
  filter,
  mergeMap,
  tap,
  concatMap,
  combineLatest,
  groupBy,
  Subscription,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-calendar-home',
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.css'],
  animations: [
    trigger('rotate', [
      state('default', style({
        transform: 'rotate(0)'
      })),
      state('rotated', style({
        transform: 'rotate(-180deg)'
      })),
      transition('default => rotated', [
        animate('0.2s ease-out')
      ]),
      transition('rotated => default', [
        animate('0.2s ease-out')
      ]),
    ]),
  ]
})
export class CalendarHomeComponent implements OnInit, OnDestroy {
  selectedDate$ = new BehaviorSubject<Date>(new Date());
  isOpen = true;

 appointmentsByHour: AppointmentsByHour = {
    '0': [],
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

  private subscription!: Subscription;

  constructor(private dialog: MatDialog, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.selectedDate$.unsubscribe();
  }

  openDialog(): void {
    this.dialog.open(CreateAppointmentDialogComponent);
  }

  selectDate(date: Date): void {
    this.selectedDate$.next(date);
  }

  removeAppointment(deletedAppointment: AppointmentModel): void {
    this.appointmentService.deleteAppointment(deletedAppointment);
  }

  private setupObservers() {
    this.subscription = combineLatest([this.appointmentService.appointments$, this.selectedDate$])
      .pipe(
        tap(() => {
          Object.keys(this.appointmentsByHour).forEach(hour => {
            this.appointmentsByHour[hour] = [];
          })
        }),
        concatMap(([appointments]) =>
          appointments.sort((a, b) => a.date.getTime() - b.date.getTime())
        ),
        filter((appointment) => {
          const selectedDate = this.selectedDate$.value;
          return (
            appointment.date.getDate() === selectedDate.getDate() &&
            appointment.date.getMonth() === selectedDate.getMonth() &&
            appointment.date.getFullYear() === selectedDate.getFullYear()
          );
        }),
        groupBy((appointment) => appointment.date.getHours()),
        mergeMap((appointmentsByHour) => {
          return appointmentsByHour.pipe(
            tap((appointments) => {
              this.appointmentsByHour[appointmentsByHour.key].push(
                appointments
              );
            })
          );
        })
      )
      .subscribe();
  }
}
