pragma solidity ^0.5.6;

contract AssetWorkflow
{
    enum StateType { Active, Commitment, WorkFinished, Approved, Rejected, Cancelled  }
    address public PropertyOwner;
    address public Inspector;
    address public Contractor;
    string public BimModelHash;
    string public BimModelUrl;
    
    StateType public State;
    string public Description;
    uint public Budget;

    constructor(string memory bimModelHash, string memory bimModelUrl, string memory description, uint256 budget) public
    {
        BimModelHash=bimModelHash;
        BimModelUrl = bimModelUrl;
        PropertyOwner = msg.sender;
        Budget = budget;
        Description = description;
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

    function ModifyBudget(uint256 adjustedBudget) public
    {
        if (State != StateType.Active)
        {
            revert();
        }
        if (PropertyOwner != msg.sender)
        {
            revert();
        }
        Budget = adjustedBudget;
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
        Contractor = inspectorAddress;
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
        State = StateType.Commitment;
    }

    function FinishWork() public
    {
        if (State != StateType.Active)
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
            State = StateType.Approved;
        }
        else
        {
            State = StateType.Rejected;
        }
    }
}