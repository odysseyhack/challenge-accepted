import { WorkflowFunction } from "./Workflow";

export interface ContractAction {
    id?: number,
    userId?: number,
    provisioningStatus?: number,
    timestamp?: string,
    parameters: Array<WorkflowActionParameter>,
    workflowFunctionId?: number,
    transactionId?: number,
    workflowStateId?: number
}

export interface ContractProperty {
    workflowPropertyID: string,
    value: string
}

export interface Transaction {
    id: number,
    connectionId?: number,
    transactionHash: string,
    blockID?: number,
    from: string,
    to: string,
    value?: number,
    isAppBuilderTx: number
}

export interface Actions {
    nextLink: string,
    workflowFunctions: Array<WorkflowFunction>
}

export interface ContractsReturnType {
    nextLink: string,
    contracts: Array<Contract>
}

export interface ActionInformation {
    workflowFunctionID: number,
    workflowActionParameters: Array<WorkflowActionParameter>
}

export interface WorkflowActionParameter {
    name: string,
    value: string
}

export interface Contract {
    id: number,
    provisioningStatus?: number,
    connectionID?: number,
    ledgerIdentifier: string,
    deployedByUserId?: number,
    workflowId?: number,
    contractCodeId?: number,
    contractProperties: Array<ContractProperty>,
    transactions: Array<Transaction>,
    contractActions: Array<ContractAction>
}