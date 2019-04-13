import { ContractsActionTypes, CONTRACTS_GETALL } from "./types";

const initialState: any = {

}

export function contractsReducer(
    state = initialState,
    action: ContractsActionTypes
): any {
    switch (action.type) {
        case CONTRACTS_GETALL: {
            return {
                ...state,
                contracts: action.payload
            }
        }
        default:
            return state
    }
}