import { UsersActionTypes, USERS_GETALL, USERS_ME, USER_GET } from "./types";

const initialState: any = {

}

export function usersReducer(
    state = initialState,
    action: UsersActionTypes
): any {
    switch (action.type) {
        case USERS_GETALL: {
            return {
                ...state,
                users: action.payload
            }
        }
        case USERS_ME: {
            return {
                ...state,
                currentUser: action.payload
            }
        }
        case USER_GET: {
            return {
                ...state,
                user: action.payload
            }
        }
        default:
            return state
    }
}