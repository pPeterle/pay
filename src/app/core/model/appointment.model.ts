export interface AppointmentModel {
    title: string;
    date: Date;
    id: number;
}

export type AppointmentsByHour = { [hour: string]: Array<AppointmentModel> }