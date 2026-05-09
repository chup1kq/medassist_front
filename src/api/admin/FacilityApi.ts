import Page from "../../data/Page";
import { apiFetch } from "../apiFetch";
import {FacilityName} from "../../data/Facility";

const API = process.env.REACT_APP_MEDASSIST_ADMIN_API;

export const getFacilities = async (
    page = 0,
    query?: string
): Promise<Page<any>> => {
    const params = new URLSearchParams({ page: String(page) });

    if (query) {
        params.append("query", query);
    }

    const res = await apiFetch(`${API}/facilities?${params.toString()}`);

    if (!res.ok) throw new Error("Ошибка загрузки учреждений");

    return res.json();
};

export const createFacility = async (data: any) => {
    const res = await apiFetch(`${API}/facilities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка создания");

    return res.json();
};

export const updateFacility = async (id: number, data: any) => {
    const res = await apiFetch(`${API}/facilities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка обновления");

    return res.json();
};

export const deleteFacility = async (id: number) => {
    const res = await apiFetch(`${API}/facilities/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Ошибка удаления");
};

export const getAllFacilities = async (): Promise<FacilityName[]> => {
    const res = await apiFetch(`${API}/facilities/all`);

    if (!res.ok) throw new Error("Ошибка загрузки учреждений");

    return res.json();
};