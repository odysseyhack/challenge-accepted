pragma solidity ^0.5.6;
import "./StringHelper.sol";
import "./SharedModels.sol";

contract Property
{
    address public PropertyOwner;
    string public  CurrentBimModelUrl;
    string public CurrentBimModelHash;
    string public Address;    
    mapping(uint => address ) public AssetWorkFlowList;

    constructor(string memory propertyAddress) public
    {
        Address = propertyAddress;
    }
    
    function InitializeBimModel(string calldata bimModelUrl, string calldata bimModelHash) external
    {
        if( msg.sender != PropertyOwner|| StringHelper.IsStringEmpty(bimModelUrl) || StringHelper.IsStringEmpty(bimModelHash))
        {
            revert();
        }
        CurrentBimModelUrl = bimModelUrl;
        CurrentBimModelHash = bimModelHash;
    }
    function StoreAssetWorkflow(address inspectorAddress) public
    {
        AssetWorkflow assetWorkflow = AssetWorkflow(msg.sender);
        if(!assetWorkflow.ValidateInspection(inspectorAddress))
        {
            revert();
        }
        CurrentBimModelUrl = assetWorkflow.BimModelUrl();
        CurrentBimModelHash = assetWorkflow.BimModelHash();
        AssetWorkFlowList[assetWorkflow.CompletionTime()] = msg.sender;
    }
}

contract AssetWorkflow
{
    //ContractProperties
    address private _propertyOwner;
    address private _inspector;
    address private _contractor;
    address private _property;
    SharedModels.AssetWorkflowState public State;
    //AssetProperties
    string public BimModelHash;
    string public BimModelUrl;
    string public Description;
    uint public Budget;
    uint256 public CompletionTime;
    
    constructor(address property, string memory bimModelHash, string memory bimModelUrl, string memory description, uint256 budget) public
    {
        _property = property;
        _propertyOwner = msg.sender;
        BimModelHash = bimModelHash;
        BimModelUrl = bimModelUrl;
        Description = description;
        Budget = budget;
        State = SharedModels.AssetWorkflowState.Active;
    }
    
    function Cancel() external
    {
        if (_propertyOwner != msg.sender || State != SharedModels.AssetWorkflowState.Active)
        {
            revert();
        }
        State = SharedModels.AssetWorkflowState.Cancelled;
    }

    function ModifyBudget(uint256 budget) external
    {
        if (State != SharedModels.AssetWorkflowState.Active)
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
        if (State != SharedModels.AssetWorkflowState.Active)
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
        if (State != SharedModels.AssetWorkflowState.Active || _propertyOwner != msg.sender)
        {
            revert();
        }
        _contractor = contractorAddress;
    }
    
    function AddInspector(address inspectorAddress) external
    {
        if (State != SharedModels.AssetWorkflowState.Active || _propertyOwner != msg.sender)
        {
            revert();
        }
        _inspector = inspectorAddress;
    }
    function ValidateInspection(address inspectorAddress) external view returns(bool)
    {
        if (_inspector == inspectorAddress && State == SharedModels.AssetWorkflowState.Approved)
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
        if (State != SharedModels.AssetWorkflowState.Active)
        {
            revert();
        }
        if (_contractor != msg.sender)
        {
            revert();
        }
        State = SharedModels.AssetWorkflowState.Committed;
    }

    function FinishWork() external
    {
        if (State != SharedModels.AssetWorkflowState.Committed)
        {
            revert();
        }
        if (_contractor != msg.sender)
        {
            revert();
        }
        State = SharedModels.AssetWorkflowState.WorkFinished;
    }

    function InspectWork(bool isWorkValid) external
    {
        if (State != SharedModels.AssetWorkflowState.WorkFinished || _inspector != msg.sender)
        {
            revert();
        }
        if(isWorkValid)
        {
            CompletionTime = now;
            State = SharedModels.AssetWorkflowState.Approved;
            Property property = Property(_property);
            property.StoreAssetWorkflow(msg.sender);
        }
        else
        {
            State = SharedModels.AssetWorkflowState.Rejected;
        }
    }
    function CompleteWorkflow() external
    {
        if(msg.sender != _property || State != SharedModels.AssetWorkflowState.Approved)
        {
            revert();
        }
        State = SharedModels.AssetWorkflowState.Completed;
    }
}