export interface Capabilities {
    canUploadApplication: boolean,
    canUploadContractCode: boolean,
    canModifyRoleAssignments: boolean,
    canProvisionUser: boolean
}

export interface UsersReturnType {
    nextLink: string,
    users: Array<User>
}

export interface UserInput {
    externalID: string,
    firstName: string,
    lastName: string,
    emailAddress: string
}

export interface UserChainMapping {
    userChainMappingID: number,
    userID: number,
    connectionID?: number,
    ChainIdentifier: string,
    chainBalance?: number
}

export interface CurrentUser {
    currentUser: User,
    capabilities: Capabilities
}

export interface User {
    userID: number,
    provisioningStatus?: number,
    externalID: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    userChainMappings: Array<UserChainMapping>
}