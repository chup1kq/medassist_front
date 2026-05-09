import {SpecialistCard, SpecialistName, SpecialistUpsertDto} from "../../data/Specialist";
import {apiFetch} from "../apiFetch";
import Page from "../../data/Page";

const API = process.env.REACT_APP_MEDASSIST_ADMIN_API;

export const getAllSpecialists = async (): Promise<SpecialistName[]> => {
    const res = await apiFetch(`${API}/specialists/all`);

    if (!res.ok) throw new Error("Ошибка загрузки специалистов");

    return res.json();
};

export const getSpecialist = async (
    id: number
): Promise<SpecialistCard> => {
    const response = await apiFetch(
        `${API}/specialists/${id}`
    );

    if (!response.ok) {
        throw new Error("Ошибка загрузки специалиста");
    }

    return await response.json();
}

export const getSpecialists = async (
    page = 0,
    query?: string
): Promise<Page<SpecialistCard>> => {
    const response = await apiFetch(
        `${API}/specialists?page=${page}${
            query
                ? `&query=${encodeURIComponent(query)}`
                : ""
        }`
    );

    if (!response.ok) {
        throw new Error("Ошибка загрузки специалистов");
    }

    return await response.json();
};

export const createSpecialist = async (
    body: SpecialistUpsertDto
): Promise<SpecialistCard> => {
    const response = await apiFetch(
        `${API}/specialists`,
        {
            method: "POST",
            body: JSON.stringify(body),
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка создания специалиста");
    }

    return await response.json();
};

export const updateSpecialist = async (
    id: number,
    body: SpecialistUpsertDto
): Promise<SpecialistCard> => {
    const response = await apiFetch(
        `${API}/specialists/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(body),
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка обновления специалиста");
    }

    return await response.json();
};

export const deleteSpecialist = async (
    id: number
): Promise<void> => {
    const response = await apiFetch(
        `${API}/specialists/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка удаления специалиста");
    }
};