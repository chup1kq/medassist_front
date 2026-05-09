import {MedicalService, MedicalServiceNameDto, MedicalServiceUpsert} from "../../data/Service";
import {apiFetch} from "../apiFetch";
import Page from "../../data/Page";

const API = process.env.REACT_APP_MEDASSIST_ADMIN_API;

export const getAllServices = async (): Promise<MedicalServiceNameDto[]> => {
    const response = await apiFetch(
        `${API}/services/all`
    );

    if (!response.ok) {
        throw new Error("Ошибка загрузки услуг");
    }

    return await response.json();
};

export const getService = async (
    id: number
): Promise<MedicalService> => {
    const response = await apiFetch(
        `${API}/services/${id}`
    );

    if (!response.ok) {
        throw new Error("Ошибка загрузки услуги");
    }

    return await response.json();
};

export const getServices = async (
    page = 0,
    query?: string
): Promise<Page<MedicalService>> => {
    const response = await apiFetch(
        `${API}/services?page=${page}${
            query
                ? `&query=${encodeURIComponent(query)}`
                : ""
        }`
    );

    if (!response.ok) {
        throw new Error("Ошибка загрузки услуг");
    }

    return await response.json();
};

export const createService = async (
    data: MedicalServiceUpsert
): Promise<MedicalService> => {
    const response = await apiFetch(
        `${API}/services`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка создания услуги");
    }

    return await response.json();
};

export const updateService = async (
    id: number,
    data: MedicalServiceUpsert
): Promise<MedicalService> => {
    const response = await apiFetch(
        `${API}/services/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка обновления услуги");
    }

    return await response.json();
};

export const deleteService = async (
    id: number
): Promise<void> => {
    const response = await apiFetch(
        `${API}/services/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка удаления услуги");
    }
};