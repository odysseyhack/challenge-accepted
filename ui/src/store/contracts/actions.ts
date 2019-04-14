import { CONTRACTS_GETALL } from './types'
import { getContract } from '../../ApiClient'
import { ContractsReturnType } from '../../types/Contract';

const getAllContracts = () => {
    return function (dispatch: any, getState: any) {
        getContract('7').then((data: ContractsReturnType) => {
            dispatch({
                type: CONTRACTS_GETALL,
                payload: data,
                data
            })
        });
    }
}

export {
    getAllContracts
}
