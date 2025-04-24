import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarHomeComponent } from './pages/home/calendar-home.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
