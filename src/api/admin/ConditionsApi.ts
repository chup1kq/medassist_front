import Page from "../../data/Page";
import { apiFetch } from "../apiFetch";
import {Condition, ConditionUpsert} from "../../data/Service";

const API = process.env.REACT_APP_MEDASSIST_ADMIN_API;

export const getAllConditions = async (): Promise<Condition[]> => {
    const res = await apiFetch(`${API}/conditions/all`);

    if (!res.ok) throw new Error("Ошибка загрузки conditions");

    return res.json();
}

export const getConditions = async (
    page = 0,
    query?: string
): Promise<Page<Condition>> => {
    const params = new URLSearchParams({
        page: String(page),
    });

    if (query) {
        params.append("query", query);
    }

    const res = await apiFetch(`${API}/conditions?${params.toString()}`);

    if (!res.ok) throw new Error("Ошибка загрузки conditions");

    return res.json();
};

export const createCondition = async (data: ConditionUpsert) => {
    const res = await apiFetch(`${API}/conditions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка создания condition");

    return res.json();
};

export const updateCondition = async (
    id: number,
    data: ConditionUpsert
) => {
    const res = await apiFetch(`${API}/conditions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка обновления condition");

    return res.json();
};

export const deleteCondition = async (id: number) => {
    const res = await apiFetch(`${API}/conditions/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Ошибка удаления condition");
};