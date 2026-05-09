export interface MedicalService {
    id: number;
    name: string;
    description: string;
    details: string;
    preparation: string;
    url: string;
    photoUrl: string;

    indicationIds: number[];
    contraindicationIds: number[];
    specialistIds: number[];
}

export interface MedicalServiceUpsert {
    name: string;
    description: string;
    details: string;
    preparation: string;
    url: string;
    photoUrl: string;

    indicationIds: number[];
    contraindicationIds: number[];
    specialistIds: number[];
}

export interface Condition {
    id: number;
    text: string;
}

export interface ConditionUpsert {
    text: string;
}

export interface MedicalServiceCard {
    id: number;
    name: string;
    description: string;
    url: string;
    photoUrl: string;
}

export interface ServicePriceDto {
    id: number;
    serviceId: number;
    serviceName: string;
    name: string;
    price: number;
}

export interface ServicePriceUpsertDto {
    serviceId: number;
    name: string;
    price: number;
}

export interface MedicalServiceNameDto {
    id: number;
    name: string;
}

export interface MedicalServiceNameDto {
    id: number;
    name: string;
}

export interface ServiceName {
    id: number;
    name: string;
    url: string;
}