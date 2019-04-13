import { UsersReturnType, CurrentUser } from "../../types/User";

export const USERS_GETALL = 'USERS_GETALL'
export const USERS_ME = 'USERS_ME'
export const USER_GET = 'USER_GET'

interface GetAllUsersAction {
    type: typeof USERS_GETALL
    payload: UsersReturnType
}

interface GetUserMeAction {
    type: typeof USERS_ME
    payload: CurrentUser
}

interface GetUserByIdAction {
    type: typeof USER_GET
    payload: CurrentUser
}

export type UsersActionTypes = GetAllUsersAction | GetUserMeAction | GetUserByIdAction