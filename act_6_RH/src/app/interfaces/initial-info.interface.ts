import { User } from "./user.interface";

export interface InitialInfo {
    page: number;
    per_page: number;
    total: number,
    total_pages: number,
    results: User[];
}
