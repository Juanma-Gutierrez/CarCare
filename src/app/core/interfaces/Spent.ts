export interface Spent {
    id: number,
    date: Date,
    amount: number,
    observations: string,
    service: Service,
    provider: number,
    vehicle: number,
}

export enum Service {
    refuelling = "Repostaje",
    repair = "Reparación",
    insurance = "Seguro",
    itv = "ITV",
    crane = "Grúa",
    cleaning = "Limpieza",
    others = "Otros"
}