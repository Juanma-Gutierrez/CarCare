export interface Provider {
    id?: number,
    name: string,
    category: ProviderCategory,
    phone: string,
    users_permissions_user?: number,
}

export enum ProviderCategory {
    workshop = 'Taller',
    insuranceCenter = 'Aseguradora',
    fuelStation = 'Gasolinera',
    cleaning = 'Limpieza',
    others = "Otros"
}
