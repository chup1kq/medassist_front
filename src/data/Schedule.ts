export interface Schedule {
    id: number;
    specialistId: number;
    specialistName: string;
    facilityId: number;
    facilityName: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
}

export interface ScheduleUpsert {
    specialistId: number;
    facilityId: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
}