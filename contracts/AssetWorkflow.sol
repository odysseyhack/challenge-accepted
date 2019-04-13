pragma solidity ^0.5.6;
import "./SharedModels.sol";

contract AssetWorkflow
{
    //enum StateType { Active, Committed, WorkFinished, Cancelled, Approved, Rejected  }
    //ContractProperties
    address public PropertyOwner;
    address public Inspector;
    address public Contractor;
    address public Property;
    SharedModels.StateType public State;
    //AssetProperties
    string public BimModelHash;
    string public BimModelUrl;
    string public Description;
    uint public Budget;
    uint256 public CompletionTime;
    
    constructor(address property, string memory bimModelHash, string memory bimModelUrl, string memory description, uint256 budget) public
    {
        // Asset = SharedModels.Asset({BimModelHash:bimModelHash, BimModelUrl:bimModelUrl,Description:description,
        // Budget:budget, CompletionTime:0});
        Property = property;
        BimModelHash = bimModelHash;
        BimModelUrl = bimModelUrl;
        Description = description;
        Budget = budget;
        PropertyOwner = msg.sender;
        State = SharedModels.StateType.Active;
    }
    
    function Cancel() public
    {
        if (PropertyOwner != msg.sender || State != SharedModels.StateType.Active)
        {
            revert();
        }
        State = SharedModels.StateType.Cancelled;
    }

    function ModifyBudget(uint256 budget) public
    {
        if (State != SharedModels.StateType.Active)
        {
            revert();
        }
        if (PropertyOwner != msg.sender)
        {
            revert();
        }
        Budget = budget;
    }

    function ModifyDescription(string memory description) public
    {
        if (State != SharedModels.StateType.Active)
        {
            revert();
        }
        if (PropertyOwner != msg.sender)
        {
            revert();
        }
        Description = description;
    }

    function AddContractor(address contractorAddress) public
    {
        if (State != SharedModels.StateType.Active || PropertyOwner != msg.sender)
        {
            revert();
        }
        Contractor = contractorAddress;
    }
    function AddInspector(address inspectorAddress) public
    {
        if (State != SharedModels.StateType.Active || PropertyOwner != msg.sender)
        {
            revert();
        }
        Inspector = inspectorAddress;
    }

    function CommitToWork() public
    {
        if (State != SharedModels.StateType.Active)
        {
            revert();
        }
        if (Contractor != msg.sender)
        {
            revert();
        }
        State = SharedModels.StateType.Committed;
    }

    function FinishWork() public
    {
        if (State != SharedModels.StateType.Committed)
        {
            revert();
        }
        if (Contractor != msg.sender)
        {
            revert();
        }
        State = SharedModels.StateType.WorkFinished;
    }

    function InspectWork(bool isWorkValid) public
    {
        if (State != SharedModels.StateType.WorkFinished || Inspector != msg.sender)
        {
            revert();
        }
        if(isWorkValid)
        {
            CompletionTime = now;
            State = SharedModels.StateType.Approved;
        }
        else
        {
            State = SharedModels.StateType.Rejected;
        }
    }
    function CompleteWorkflow() public
    {
        if(msg.sender != PropertyOwner || State != SharedModels.StateType.Approved)
        {
            revert();
        }
        State = SharedModels.StateType.Completed;
    }
}