import { CalendarPage } from '../pages/calendar_page';

describe('Home Page', () => {
  let calendarPage: CalendarPage;

  beforeEach(() => {
    calendarPage = new CalendarPage();
    calendarPage.visit();
  });

  it('add new appointment', () => {
    calendarPage.createAppointment();
    calendarPage
      .getAppointmentText()
      .first()
      .should('have.text', '00:00 - my title');
  });

  it('exclude appointment', () => {
    calendarPage.createAppointment();

    calendarPage.deleteAppointment();

    calendarPage.getAppointmentText().should('not.exist');
  });

  it('update appointment', () => {
    calendarPage.createAppointment();

    calendarPage.getAppointmentText().first().click();
    calendarPage.updateAppointmentTitle('new title');
    calendarPage.clickUpdateAppointment();

    calendarPage
      .getAppointmentText()
      .first()
      .should('have.text', '00:00 - new title');
  });
});
