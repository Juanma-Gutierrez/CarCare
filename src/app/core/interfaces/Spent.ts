export interface Spent {
    id: number,
    date: Date,
    amount: number,
    observations?: string,
    provider: number,
    vehicle: number,
}
