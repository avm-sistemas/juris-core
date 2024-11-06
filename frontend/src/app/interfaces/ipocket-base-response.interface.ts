export interface IPocketBaseResponse {
    success?: boolean;
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: any[];
}