pragma solidity ^0.4.25;

library SharedModels
{
      enum AssetWorkflowState { Active, Committed, WorkFinished, Cancelled, Approved, Rejected, Completed  }
      enum PropertyState {Active, Disabled}
}