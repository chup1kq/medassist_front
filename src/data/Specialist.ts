import {Specialisation} from "./Specialisation";
import {Review} from "./Review";
import {Schedule} from "./Schedule";

export interface Specialist {
    id: number;
    fullName: string;
    description: string;
    experienceYears: number;
    photoUrl: string;
    active: boolean;
    specialisations: Specialisation[];
    schedules: Schedule[];
    reviews: Review[];
}