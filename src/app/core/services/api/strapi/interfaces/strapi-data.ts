import { StrapiUser } from "./strapi-users";

export type StrapiMe = StrapiUser;

/**
 * StrapiResponse
 */
export interface StrapiResponse<T> {
    data: StrapiData<T>
}

/**
 * StrapiData
 */
export interface StrapiData<T> {
    id: number,
    attributes: T
}

export interface StrapiArrayResponse<T> {
    data: StrapiData<T>[],
    meta: {
        pagination?: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number,
        }
    }
}

export interface StrapiExtendedUser {
    id?: number,
    name: string,
    surname: string,
    user_id: number,
    nickname?: string,
}