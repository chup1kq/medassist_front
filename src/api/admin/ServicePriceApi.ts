import Page from "../../data/Page";
import {ServicePriceDto, ServicePriceUpsertDto} from "../../data/Service";
import {apiFetch} from "../apiFetch";

const API = process.env.REACT_APP_MEDASSIST_ADMIN_API;

export const getServicePrices = async (
    page = 0,
    query?: string
): Promise<Page<ServicePriceDto>> => {
    const response = await apiFetch(
        `${API}/service-prices?page=${page}${
            query ? `&query=${encodeURIComponent(query)}` : ""
        }`
    );

    if (!response.ok) {
        throw new Error("Ошибка загрузки цен");
    }

    return await response.json();
};

export const createServicePrice = async (
    body: ServicePriceUpsertDto
) => {
    const response = await apiFetch(`${API}/service-prices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("Ошибка создания");
    }

    return await response.json();
};

export const updateServicePrice = async (
    id: number,
    body: ServicePriceUpsertDto
) => {
    const response = await apiFetch(
        `${API}/service-prices/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка обновления");
    }

    return await response.json();
};

export const deleteServicePrice = async (id: number) => {
    const response = await apiFetch(
        `${API}/service-prices/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка удаления");
    }
};