export interface StrapiResponse<T> {
    data: T
}

/**
 * Main response of Strapi to Vehicles
 */
export type StrapiVehiclesResponse = StrapiResponse<VehicleItem>

/**
 * Vehicle item
 */
export interface VehicleItem {
    id: number
    attributes: VehicleItemAttributes
}

/**
 * Attributes of a vehicle item
 */
export interface VehicleItemAttributes {
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
