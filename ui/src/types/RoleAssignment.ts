import { User } from "./User";

export interface RoleAssignment {
    id: string,
    applicationRoleId?: number,
    user: User
}

export interface RoleAssignmentReturnType {
    nextLink: string,
    roleAssignments: Array<RoleAssignment>
}