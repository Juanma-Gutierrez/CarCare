import { StrapiResponse } from "./strapi-data"

/**
 * Main response of Strapi to Spents
 */
export type StrapiProvidersResponse = StrapiResponse<SpentItem>

export interface SpentItem {
    id: number,
    attributes: {
        date: Date,
        amount: number,
        observations: string
        vehicle: {
            data: {
                id: number
            }
        }
    }
}
