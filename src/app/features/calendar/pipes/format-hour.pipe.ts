import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formartHour' })
export class FormatHourPipe implements PipeTransform {
  transform(hour: string): string {
    if (hour.length === 1) return `0${hour}:00`;

    if (hour.length === 2) return `${hour}:00`;

    if (hour.length >= 3) throw Error('Invalid hour format');

    return hour;
  }
}
