export interface ChainType {
    id: number,
    name: string,
    displayName: string,
}

export interface ChainTypeReturnType {
    nextLink: string;
    chainTypes: Array<ChainType>
}