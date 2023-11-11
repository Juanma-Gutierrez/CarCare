export interface Provider {
    id: number,
    name: string,
    category: ProviderCategory,
    phone: string,
    spents?: number[]
}

export enum ProviderCategory {
    workshop = 'Taller',
    insuranceCenter = 'Aseguradora',
    fuelStation = 'Gasolinera',
    cleaning = 'Limpieza',
    others = "Otros"
}
