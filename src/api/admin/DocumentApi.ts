import { apiFetch } from "../apiFetch";
import Page from "../../data/Page";
import { Document, DocumentUpsert } from "../../data/Document";

const API = "http://localhost:8080/api/v1/admin";

export const getDocuments = async (
    page = 0,
    query?: string
): Promise<Page<Document>> => {
    const response = await apiFetch(
        `${API}/documents?page=${page}${
            query
                ? `&query=${encodeURIComponent(query)}`
                : ""
        }`
    );

    if (!response.ok) {
        throw new Error("Ошибка загрузки документов");
    }

    return await response.json();
};

export const createDocument = async (
    data: DocumentUpsert
): Promise<Document> => {
    const response = await apiFetch(
        `${API}/documents`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Ошибка создания документа"
        );
    }

    return await response.json();
};

export const updateDocument = async (
    id: number,
    data: DocumentUpsert
): Promise<Document> => {
    const response = await apiFetch(
        `${API}/documents/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Ошибка обновления документа"
        );
    }

    return await response.json();
};

export const deleteDocument = async (
    id: number
): Promise<void> => {
    const response = await apiFetch(
        `${API}/documents/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Ошибка удаления документа"
        );
    }
};