import { apiFetch } from "../apiFetch";

const API = process.env.REACT_APP_MEDASSIST_ADMIN_API;

export const getSpecialistFacilities = async () => {
    const res = await apiFetch(
        `${API}/specialist-facilities`
    );

    if (!res.ok) {
        throw new Error(
            "Ошибка загрузки связей"
        );
    }

    return res.json();
};

export const createSpecialistFacility = async (
    data: {
        specialistId: number;
        facilityId: number;
    }
) => {
    const res = await apiFetch(
        `${API}/specialist-facilities`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        throw new Error(
            "Ошибка создания связи"
        );
    }

    return res.json();
};

export const updateSpecialistFacility = async (
    id: number,
    data: {
        specialistId: number;
        facilityId: number;
    }
) => {
    const res = await apiFetch(
        `${API}/specialist-facilities/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        throw new Error(
            "Ошибка обновления связи"
        );
    }

    return res.json();
};

export const deleteSpecialistFacility = async (
    id: number
) => {
    const res = await apiFetch(
        `${API}/specialist-facilities/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!res.ok) {
        throw new Error(
            "Ошибка удаления связи"
        );
    }
};