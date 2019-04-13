export interface Ledger {
    id: number,
    name: string,
    displayName: string
}

export interface LedgersReturnType {
    nextLink: string,
    ledgers: Array<Ledger>
}