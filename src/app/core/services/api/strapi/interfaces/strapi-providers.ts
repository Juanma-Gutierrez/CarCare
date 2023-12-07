import { PaginatedData } from "src/app/core/interfaces/data"
import { StrapiResponse } from "./strapi-data"
import { ProviderCategory } from "src/app/core/interfaces/Provider"

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
    id?: number,
    name: string
    category: ProviderCategory
    phone: string
    users_permissions_user?: number
}

export type PaginatedProviders = PaginatedData<StrapiProvider>;