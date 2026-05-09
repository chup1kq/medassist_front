import Page from "../../data/Page";
import { apiFetch } from "../apiFetch";
import {Schedule, ScheduleUpsert} from "../../data/Schedule";

const API = process.env.REACT_APP_MEDASSIST_ADMIN_API;

export const getSchedules = async (
    page = 0,
    specialistQuery?: string,
    facilityQuery?: string
): Promise<Page<Schedule>> => {

    const params = new URLSearchParams({
        page: String(page),
    });

    if (specialistQuery) {
        params.append("specialistQuery", specialistQuery);
    }

    if (facilityQuery) {
        params.append("facilityQuery", facilityQuery);
    }

    const res = await apiFetch(`${API}/schedules?${params.toString()}`);

    if (!res.ok) throw new Error("Ошибка загрузки расписания");

    return res.json();
};

export const createSchedule = async (data: ScheduleUpsert) => {
    const res = await apiFetch(`${API}/schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка создания");
    return res.json();
};

export const updateSchedule = async (id: number, data: ScheduleUpsert) => {
    const res = await apiFetch(`${API}/schedules/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка обновления");
    return res.json();
};

export const deleteSchedule = async (id: number) => {
    const res = await apiFetch(`${API}/schedules/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Ошибка удаления");
};