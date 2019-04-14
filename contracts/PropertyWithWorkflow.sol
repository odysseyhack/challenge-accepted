pragma solidity ^0.4.25;

import "./StringHelper.sol";
import "./ERC20.sol";

contract Property
{
    enum PropertyState { Active, Disabled }
    address public PropertyOwner;
    string public CurrentBimModelUrl;
    string public CurrentBimModelHash;
    string public Address;    
    PropertyState public State;

    mapping(uint256 => address ) public AssetWorkflows;

    constructor(string memory propertyAddress) public
    {
        Address = propertyAddress;
    }
    
    function CreateAssetWorkFlow(address propertyOwner, string memory bimModelHash, string memory bimModelUrl, string memory description, uint256 budget, address tokenAddress) public
    {
        //workbench doesnt support solidity v5 as below
        address assetWorkflowAddress = address(new AssetWorkflow(propertyOwner, bimModelHash, bimModelUrl, description, budget, tokenAddress));
        //version 4.x below
        //address assetWorkflowAddress = new AssetWorkflow(propertyOwner, bimModelHash, bimModelUrl, description, budget);
        AssetWorkflows[now] = assetWorkflowAddress;
    }

    function InitializeBimModel(string memory bimModelUrl, string memory bimModelHash) public
    {
        if( msg.sender != PropertyOwner|| StringHelper.IsStringEmpty(bimModelUrl) || StringHelper.IsStringEmpty(bimModelHash))
        {
            revert();
        }
        CurrentBimModelUrl = bimModelUrl;
        CurrentBimModelHash = bimModelHash;
    }

    function UpdateCurrentBimModel(address inspectorAddress) public
    {
        AssetWorkflow assetWorkflow = AssetWorkflow(msg.sender);
        if(!assetWorkflow.ValidateInspection(inspectorAddress))
        {
            revert();
        }
        CurrentBimModelUrl = assetWorkflow.BimModelUrl();
        CurrentBimModelHash = assetWorkflow.BimModelHash();
    }
}

contract AssetWorkflow
{
    enum AssetWorkflowState { Active, Committed, WorkFinished, Cancelled, Approved, Rejected, Completed  }
    //ContractProperties
    address private _propertyOwner;
    address private _inspector;
    address private _contractor;
    address private _property;
    address private _tokenAddress;
    AssetWorkflowState public State;
    //AssetProperties
    string public BimModelHash;
    string public BimModelUrl;
    string public Description;
    uint public Budget;
    uint256 public CompletionTime;
    
    constructor(address propertyOwner, string memory bimModelHash, string memory bimModelUrl, string memory description, uint256 budget, address tokenAddress) public
    {
        _property = msg.sender;
        _propertyOwner = propertyOwner;
        BimModelHash = bimModelHash;
        BimModelUrl = bimModelUrl;
        Description = description;
        Budget = budget;
        _tokenAddress = tokenAddress;
        State = AssetWorkflowState.Active;
    }
    
    function Cancel() external
    {
        if (_propertyOwner != msg.sender || State != AssetWorkflowState.Active)
        {
            revert();
        }
        State = AssetWorkflowState.Cancelled;
    }

    function ModifyBudget(uint256 budget) external
    {
        if (State != AssetWorkflowState.Active)
        {
            revert();
        }
        if (_propertyOwner != msg.sender)
        {
            revert();
        }
        Budget = budget;
    }

    function ModifyDescription(string memory description) public
    {
        if (State != AssetWorkflowState.Active)
        {
            revert();
        }
        if (_propertyOwner != msg.sender)
        {
            revert();
        }
        Description = description;
    }

    function AddContractor(address contractorAddress) public
    {
        if (State != AssetWorkflowState.Active || _propertyOwner != msg.sender)
        {
            revert();
        }
        _contractor = contractorAddress;
    }
    
    function AddInspector(address inspectorAddress) public
    {
        if (State != AssetWorkflowState.Active || _propertyOwner != msg.sender)
        {
            revert();
        }
        _inspector = inspectorAddress;
    }

    function ValidateInspection(address inspectorAddress) public view returns(bool)
    {
        if (_inspector == inspectorAddress && State == AssetWorkflowState.Approved)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function CommitToWork() public
    {
        if (State != AssetWorkflowState.Active)
        {
            revert();
        }
        if (_contractor != msg.sender)
        {
            revert();
        }
        State = AssetWorkflowState.Committed;
    }

    function FinishWork() public
    {
        if (State != AssetWorkflowState.Committed)
        {
            revert();
        }
        if (_contractor != msg.sender)
        {
            revert();
        }
        State = AssetWorkflowState.WorkFinished;
    }

    function InspectWork(bool isWorkValid) public
    {
        if (State != AssetWorkflowState.WorkFinished || _inspector != msg.sender)
        {
            revert();
        }
        if(isWorkValid)
        {
            ERC20 erc20 = ERC20(_tokenAddress);
            erc20.TransferFrom(_propertyOwner, _contractor, Budget);

            CompletionTime = now;
            State = AssetWorkflowState.Approved;
            Property property = Property(_property);
            property.UpdateCurrentBimModel(msg.sender);
        }
        else
        {
            State = AssetWorkflowState.Rejected;
        }
    }

    function CompleteWorkflow() public
    {
        if(msg.sender != _property || State != AssetWorkflowState.Approved)
        {
            revert();
        }
        State = AssetWorkflowState.Completed;
    }
}