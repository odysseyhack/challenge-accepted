import { ContractsReturnType } from "../../types/Contract";

export const CONTRACTS_GETALL = 'CONTRACTS_GETALL'

interface GetAllContractsAction {
    type: typeof CONTRACTS_GETALL
    payload: ContractsReturnType
}


export type ContractsActionTypes = GetAllContractsAction 