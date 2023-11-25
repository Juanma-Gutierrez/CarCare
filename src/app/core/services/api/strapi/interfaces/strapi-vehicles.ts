/**
 * Main response of Strapi to Vehicles
 */
export interface StrapiVehiclesResponse {
    data: VehicleItem[]
    meta: VehicleMeta
}

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

/**
 * Vehicles meta info of the response
 */
export interface VehicleMeta {
    pagination: VehiclePagination
}

/**
 * Vehicles pagination info
 */
export interface VehiclePagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}
