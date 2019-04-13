export interface Workflow {
    id: number,
    name: string,
    description: string,
    displayName: string,
    applicationId?: number,
    constructorId?: number,
    startStateId?: number,
    initiators: Array<string>,
    properties: Array<Property>,
    constructor: WorkflowFunction,
    functions: Array<WorkflowFunction>,
    startState: State,
    states: Array<State>
}

export interface WorkflowReturnType {
    nextLink: string,
    workflows: Array<Workflow>
}

export interface WorkflowFunction {
    id: number,
    name: string,
    description: string,
    displayName: string,
    parameters: Array<Parameter>,
    workflowId?: number,
    preconditions: Array<Condition>,
    postconditions: Array<Condition>
}

export interface Parameter {
    id: string,
    description: string,
    name: string,
    displayName: string,
    type: TypeClass
}

export interface Condition {
    expression: string
}

export interface Property {
    id: number,
    name: string,
    description: string,
    displayName: string,
    type: TypeClass
}

export interface TypeClass {
    id: number,
    name: string,
    elementType: ElementType,
    elementTypeId?: number,
    enumValues: Array<string>
}

export interface ElementType {
    name: string
}

export interface State {
    id: number,
    name: string,
    description: string,
    displayName: string,
    percentComplete?: number,
    value?: number,
    style: string,
    workflowStateTransitions: Array<WorkflowStateTransition>
}

export interface WorkflowStateTransition {
    id: number,
    workflowFunctionId?: number,
    currStateId?: number,
    allowedRoles: Array<string>,
    allowedInstanceRoles: Array<string>,
    description: string,
    function: string,
    currentState: string,
    displayName: string
}

export class ContractParameterType {
    QrCode:string = "qrcode";
    Gps:string = "gps";
    Image:string = "image";
    Document:string = "document";
    Barcode:string = "barcode";
    String:string = "string";
    Money:string = "money";
    Uint:string = "uint";
    Int:string = "int";
    User:string = "user";
    Device:string = "device";
    Enum:string = "enum";
    Bool:string = "bool";
    Contract:string = "contract";
    Time:string = "time";
    Address:string = "address";
    State:string = "state";
    Array:string = "array";
}