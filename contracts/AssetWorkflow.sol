pragma solidity ^0.5.6;
import "./SharedModels.sol";

contract AssetWorkflow
{
    //enum StateType { Active, Committed, WorkFinished, Cancelled, Approved, Rejected  }
    //ContractProperties
    address private _propertyOwner;
    address private _inspector;
    address private _contractor;
    address private _property;
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
        _property = property;
        _propertyOwner = msg.sender;
        BimModelHash = bimModelHash;
        BimModelUrl = bimModelUrl;
        Description = description;
        Budget = budget;
        State = SharedModels.StateType.Active;
    }
    
    function Cancel() external
    {
        if (_propertyOwner != msg.sender || State != SharedModels.StateType.Active)
        {
            revert();
        }
        State = SharedModels.StateType.Cancelled;
    }

    function ModifyBudget(uint256 budget) external
    {
        if (State != SharedModels.StateType.Active)
        {
            revert();
        }
        if (_propertyOwner != msg.sender)
        {
            revert();
        }
        Budget = budget;
    }

    function ModifyDescription(string calldata description) external
    {
        if (State != SharedModels.StateType.Active)
        {
            revert();
        }
        if (_propertyOwner != msg.sender)
        {
            revert();
        }
        Description = description;
    }

    function AddContractor(address contractorAddress) external
    {
        if (State != SharedModels.StateType.Active || _propertyOwner != msg.sender)
        {
            revert();
        }
        _contractor = contractorAddress;
    }
    
    function AddInspector(address inspectorAddress) external
    {
        if (State != SharedModels.StateType.Active || _propertyOwner != msg.sender)
        {
            revert();
        }
        _inspector = inspectorAddress;
    }
    function ValidateInspector(address inspectorAddress) public view returns(bool)
    {
        if (_inspector == inspectorAddress)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function CommitToWork() external
    {
        if (State != SharedModels.StateType.Active)
        {
            revert();
        }
        if (_contractor != msg.sender)
        {
            revert();
        }
        State = SharedModels.StateType.Committed;
    }

    function FinishWork() external
    {
        if (State != SharedModels.StateType.Committed)
        {
            revert();
        }
        if (_contractor != msg.sender)
        {
            revert();
        }
        State = SharedModels.StateType.WorkFinished;
    }

    function InspectWork(bool isWorkValid) external
    {
        if (State != SharedModels.StateType.WorkFinished || _inspector != msg.sender)
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
        if(msg.sender != _propertyOwner || State != SharedModels.StateType.Approved)
        {
            revert();
        }
        State = SharedModels.StateType.Completed;
    }
}