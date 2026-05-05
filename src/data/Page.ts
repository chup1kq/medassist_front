export interface Page<T> {
    content: T[];
    totalPages: number;
    number: number;
}

export default Page;