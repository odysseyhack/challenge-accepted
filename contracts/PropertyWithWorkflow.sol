pragma solidity ^0.4.25;

import "./StringHelper.sol";
import "./ERC20.sol";

contract Property
{
    enum StateType { Active }
    address public PropertyOwner;
    string public CurrentBimModelUrl;
    string public CurrentBimModelHash;
    string public Address;    
    StateType public State;

    mapping(uint256 => address ) public AssetWorkflows;

    constructor(string propertyAddress) public
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
    enum StateType { Active, Committed, WorkFinished, Cancelled, Approved, Rejected, Completed  }
    //ContractProperties
    address private PropertyOwner;
    address private Inspector;
    address private _contractor;
    address private PropertyAddress;
    address private TokenAddress;
    StateType public State;
    //AssetProperties
    string public BimModelHash;
    string public BimModelUrl;
    string public Description;
    uint public Budget;
    uint256 public CompletionTime;
    
    constructor(address propertyOwner, string memory bimModelHash, string memory bimModelUrl, string memory description, uint256 budget, address tokenAddress) public
    {
        PropertyAddress = msg.sender;
        PropertyOwner = propertyOwner;
        BimModelHash = bimModelHash;
        BimModelUrl = bimModelUrl;
        Description = description;
        Budget = budget;
        TokenAddress = tokenAddress;
        State = StateType.Active;
    }
    
    function Cancel() external
    {
        if (PropertyOwner != msg.sender || State != StateType.Active)
        {
            revert();
        }
        State = StateType.Cancelled;
    }

    function ModifyBudget(uint256 budget) external
    {
        if (State != StateType.Active)
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
        if (State != StateType.Active)
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
        if (State != StateType.Active || PropertyOwner != msg.sender)
        {
            revert();
        }
        _contractor = contractorAddress;
    }
    
    function AddInspector(address inspectorAddress) public
    {
        if (State != StateType.Active || PropertyOwner != msg.sender)
        {
            revert();
        }
        Inspector = inspectorAddress;
    }

    function ValidateInspection(address inspectorAddress) public view returns(bool)
    {
        if (Inspector == inspectorAddress && State == StateType.Approved)
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
        if (State != StateType.Active)
        {
            revert();
        }
        if (_contractor != msg.sender)
        {
            revert();
        }
        State = StateType.Committed;
    }

    function FinishWork() public
    {
        if (State != StateType.Committed)
        {
            revert();
        }
        if (_contractor != msg.sender)
        {
            revert();
        }
        State = StateType.WorkFinished;
    }

    function InspectWork(bool isWorkValid) public
    {
        if (State != StateType.WorkFinished || Inspector != msg.sender)
        {
            revert();
        }
        if(isWorkValid)
        {
            ERC20 erc20 = ERC20(TokenAddress);
            erc20.TransferFrom(PropertyOwner, _contractor, Budget);

            CompletionTime = now;
            State = StateType.Approved;
            Property property = Property(PropertyAddress);
            property.UpdateCurrentBimModel(msg.sender);
        }
        else
        {
            State = StateType.Rejected;
        }
    }

    function CompleteWorkflow() public
    {
        if(msg.sender != PropertyAddress || State != StateType.Approved)
        {
            revert();
        }
        State = StateType.Completed;
    }
}