import { USERS_GETALL, USERS_ME, USER_GET } from './types'
import { UsersReturnType, CurrentUser } from '../../types/User';
import { getUsers, usersMe, getUserById } from '../../ApiClient'


const getMe = () => {
    return function (dispatch: any, getState: any) {
        usersMe().then((data: CurrentUser) => {
            dispatch( {
                type: USERS_ME,
                payload: data,
                data
            })
        });
    }
}

const getUser = (userId: number) => {
    return function (dispatch: any, getState: any) {
        getUserById(userId).then((data: any) => {
            dispatch( {
                type: USER_GET,
                payload: data,
                data
            })
        });
    }
}

const getAllUsers = () => {
    return function (dispatch: any, getState: any) {
        getUsers().then((data: UsersReturnType) => {
            dispatch({
                type: USERS_GETALL,
                payload: data,
                data
            })
        });
    }
}

export {
    getMe, getAllUsers, getUser
}
