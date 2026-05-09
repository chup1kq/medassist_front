export interface Document {
    id: number;
    name: string;
    description: string;
    fileUrl: string;
    documentType: DocumentType;
}

export interface DocumentUpsert {
    name: string;
    description: string;
    fileUrl: string;
    documentTypeId: number;
}

export interface DocumentType {
    id: number;
    name: string;
}

export interface DocumentTypeUpsert {
    name: string;
}
