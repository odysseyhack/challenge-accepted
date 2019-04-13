export interface ApplicationReturnType {
    NextLink: string,
    applications: Array<Application>
}

export interface Application {
    id: number,
    name: string,
    description: string,
    displayName: string,
    createdByUserId?: number,
    createdDtTm: string,
    enabled: boolean,
    applicationRoles: Array<ApplicationRole>
}

export interface ApplicationRole {
    id: number,
    name: string,
    description: string,
    applicationId?: number
}