import Page from "../../data/Page";
import { apiFetch } from "../apiFetch";
import {DocumentType, DocumentTypeUpsert} from "../../data/Document";

const API = process.env.REACT_APP_MEDASSIST_ADMIN_API;

export const getDocumentTypes = async (
    page = 0,
    query?: string
): Promise<Page<DocumentType>> => {

    const params = new URLSearchParams({
        page: String(page),
    });

    if (query) {
        params.append("query", query);
    }

    const res = await apiFetch(`${API}/document-types?${params.toString()}`);

    if (!res.ok) throw new Error("Ошибка загрузки");

    return res.json();
};

export const createDocumentType = async (data: DocumentTypeUpsert) => {
    const res = await apiFetch(`${API}/document-types`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка создания");

    return res.json();
};

export const updateDocumentType = async (
    id: number,
    data: DocumentTypeUpsert
) => {
    const res = await apiFetch(`${API}/document-types/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка обновления");

    return res.json();
};

export const deleteDocumentType = async (id: number) => {
    const res = await apiFetch(`${API}/document-types/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Ошибка удаления");
};