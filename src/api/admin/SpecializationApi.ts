import Page from "../../data/Page";
import {Specialization, SpecializationUpsert} from "../../data/Specialist";
import {apiFetch} from "../apiFetch";

const API = process.env.REACT_APP_MEDASSIST_ADMIN_API;

export const getSpecializations = async (
    page = 0,
    query?: string
): Promise<Page<Specialization>> => {

    const params = new URLSearchParams({
        page: String(page),
    });

    if (query) {
        params.append("query", query);
    }

    const res = await apiFetch(`${API}/specializations?${params.toString()}`);

    if (!res.ok) throw new Error("Ошибка загрузки");

    return res.json();
};

export const createSpecialization = async (data: SpecializationUpsert) => {
    const res = await apiFetch(`${API}/specializations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка создания");

    return res.json();
};

export const updateSpecialization = async (
    id: number,
    data: SpecializationUpsert
) => {
    const res = await apiFetch(`${API}/specializations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка обновления");

    return res.json();
};

export const deleteSpecialization = async (id: number) => {
    const res = await apiFetch(`${API}/specializations/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Ошибка удаления");
};