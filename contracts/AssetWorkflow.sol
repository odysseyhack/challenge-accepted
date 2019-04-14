pragma solidity ^0.4.25;

import "./ERC20.sol";

contract AssetWorkflow
{
    enum StateType { Active, Committed, WorkFinished, Cancelled, Approved, Rejected  }
    address public PropertyOwner;
    address public Inspector;
    address public Contractor;
    string public BimModelHash;
    string public BimModelUrl;
    string public Description;
    uint256 public Budget;
    StateType public State;

    address public TokenAddress;

    constructor(string memory bimModelHash, string memory bimModelUrl, string memory description, uint256 budget, address tokenAddress) public
    {
        BimModelHash = bimModelHash;
        BimModelUrl = bimModelUrl;
        PropertyOwner = msg.sender;
        Budget = budget;
        Description = description;
        TokenAddress = tokenAddress;
        State = StateType.Active;
    }

    function Cancel() public
    {
        if (PropertyOwner != msg.sender || State != StateType.Active)
        {
            revert();
        }
        State = StateType.Cancelled;
    }

    function ModifyBudget(uint256 budget) public
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
        Contractor = contractorAddress;
    }
    function AddInspector(address inspectorAddress) public
    {
        if (State != StateType.Active || PropertyOwner != msg.sender)
        {
            revert();
        }
        Inspector = inspectorAddress;
    }

    function CommitToWork() public
    {
        if (State != StateType.Active)
        {
            revert();
        }
        if (Contractor != msg.sender)
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
        if (Contractor != msg.sender)
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
            erc20.TransferFrom(PropertyOwner, Contractor, Budget);
            
            State = StateType.Approved;
        }
        else
        {
            State = StateType.Rejected;
        }
    }
}