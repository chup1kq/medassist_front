import {Review} from "./Review";
import {Schedule} from "./Schedule";

export interface Specialist {
    id: number;
    fullName: string;
    description: string;
    experienceYears: number;
    photoUrl: string;
    active: boolean;
    specialisations: Specialization[];
    schedules: Schedule[];
    reviews: Review[];
}

export interface Specialization {
    id: number;
    name: string;
}

export interface SpecializationUpsert {
    name: string;
}

export interface SpecialistName {
    id: number;
    fullName: string;
}

export interface SpecialistCard {
    id: number;
    fullName: string;
    description: string;
    experienceYears: number;
    photoUrl: string;
    active: boolean;
    specializations: Specialization[];
}

export interface SpecialistUpsertDto {
    fullName: string;
    description: string;
    experienceYears: number;
    photoUrl: string;
    active: boolean;
    specializationIds: number[];
}