import { PaginatedData } from "src/app/core/interfaces/data"
import { StrapiResponse } from "./strapi-data"

/**
 * Main response of Strapi to Providers
 */
export type StrapiProvidersResponse = StrapiResponse<ProviderItem>

export interface ProviderItem {
    id: number,
    attributes: {
        name: string
        category: string
        phone: string
    }
}

export interface StrapiProvider {
    name: string
    category: string
    phone: string
}

export type PaginatedProviders = PaginatedData<StrapiProvider>;

/* 
Categorías de proveedores:
    workshop,
    gasStation,
    insuranceCompany,
    ITV,
    towTruck,
    other,
 */