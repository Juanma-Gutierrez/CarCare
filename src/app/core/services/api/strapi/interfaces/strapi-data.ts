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

