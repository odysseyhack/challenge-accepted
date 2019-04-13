export interface ContractCode {
    contractCodeID: number,
    ledgerID?: number,
    createdByUserId?: number,
    createdDtTm: string
}

export interface ContractCodesReturnType {
    nextLink: string,
    contractCodes: Array<ContractCode>
}