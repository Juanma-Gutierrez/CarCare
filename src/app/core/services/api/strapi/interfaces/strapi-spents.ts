import { PaginatedData } from "src/app/core/interfaces/data"
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
        },
        provider: {
            data: {
                id: number
            }
        }
    }
}

/* export interface StrapiSpent {
    data: {
        id: number
        attributes: {
            date: Date
            amount: number
            observations: string
            provider: {
                data: {
                    id: number
                }
            }
            vehicle: {
                data: {
                    id: number
                }
            }
        }
    }
} */




export interface StrapiSpent {
    date: Date
    amount: number
    observations: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    provider: {
        data: {
            id: number
            attributes: {
                name: string
                category: string
                phone: string
                createdAt: string
                updatedAt: string
                publishedAt: string
            }
        }
    }
    vehicle: {
        data: {
            id: number
            attributes: {
                plate: string
                brand: string
                model: string
                registrationDate: string
                category: string
                available: boolean
                createdAt: string
                updatedAt: string
                publishedAt: string
            }
        }
    }
    id: number
}
export type PaginatedSpents = PaginatedData<StrapiSpent>;