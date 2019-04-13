pragma solidity ^0.5.6;
import "./StringHelper.sol";
import "./Assetworkflow.sol";
import "./SharedModels.sol";
contract Property
{
    address public PropertyOwner;
    string public CurrentBimModelUrl;
    string public CurrentBimModelHash;
    string public Address;    
    mapping(uint => address ) public AssetWorkFlows;

    constructor(string memory propertyAddress) public
    {
        Address = propertyAddress;
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
    function StoreAssetWorkflow(address assetWorkflowAddress) public
    {
        if(msg.sender != PropertyOwner)
        {
            revert();
        }
        AssetWorkflow assetWorkflow = AssetWorkflow(assetWorkflowAddress);
        if(assetWorkflow.State != SharedModels.StateType.Approved)
        {
            revert();
        }
        CurrentBimModelUrl = assetWorkflow.BimModelUrl;
        CurrentBimModelHash = assetWorkflow.BimModelHash;
        AssetWorkFlows[assetWorkflow.CompletionTime] = assetWorkflowAddress;
    }
}