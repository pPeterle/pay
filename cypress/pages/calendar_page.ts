export class CalendarPage {
  public visit() {
    cy.visit('/');
  }

  public createAppointment() {
    this.clickAddAppointmentButton();
    this.addAppointmentTitle('my title');
    this.addAppointmentTime('00:00');
    this.clickCreateAppointment();
  }

  public deleteAppointment() {
    this.getAppointmentText().first().click();
    this.clickDeleteAppointment();
    this.clickConfirmDeleteAppointment();
  }

  public clickAddAppointmentButton() {
    return cy.byTestId('add-appointment-button').first().click();
  }

  public updateAppointmentTitle(term: string) {
    return cy
      .byTestId('update-appointment-title-input')
      .first()
      .clear()
      .type(term);
  }

  public addAppointmentTitle(term: string) {
    return cy
      .byTestId('create-appointment-title-input')
      .first()
      .clear()
      .type(term);
  }

  public addAppointmentTime(term: string) {
    return cy
      .byTestId('create-appointment-time-input')
      .first()
      .clear()
      .type(term);
  }

  public clickUpdateAppointment() {
    return cy.byTestId('save-appointment-button').first().click();
  }

  public clickCreateAppointment() {
    return cy.byTestId('create-appointment-button').first().click();
  }

  public getAppointmentText() {
    return cy.byTestId('appointment-text');
  }

  public clickDeleteAppointment() {
    return cy.byTestId('delete-appointment-button').first().click();
  }

  public clickConfirmDeleteAppointment() {
    return cy.byTestId('delete-appointment').first().click();
  }
}
