export interface Connection {
    connectionID: number,
    ledgerID?: number,
    endpointURL: string
    fundingAccount: string
}

export interface BlockReturnType {
    nextLink: string
    blocks: Array<Block>
}

export interface Block {
    id: number,
    connectionId?: number,
    timestamp: string,
    blockNumber?: number,
    blockHash: string,    
}

export interface TransactionReturnType {
    nextLink: string,
    transactions: Array<Transaction>
}

export interface Transaction {
    id: number,
    connectionId: string,
    transactionHash: string,
    blockID?: number,
    from: string,
    to: string,
    value?: number,
    isAppBuilderTx: boolean
}