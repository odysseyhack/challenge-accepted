pragma solidity ^0.5.6;
import "./StringHelper.sol";
import "./Assetworkflow.sol";
import "./SharedModels.sol";
contract Property
{
    address public PropertyOwner;
    string public  CurrentBimModelUrl;
    string public CurrentBimModelHash;
    string public Address;    
    mapping(uint => address ) public AssetWorkFlows;

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
    function StoreAssetWorkflow(address validatorAddress) public
    {
         AssetWorkflow assetWorkflow = AssetWorkflow(msg.sender);
        if(assetWorkflow.State() != SharedModels.AssetWorkflowState.Approved)
        {
            revert();
        }
        if(!assetWorkflow.ValidateInspector(validatorAddress))
        {
            revert();
        }
        CurrentBimModelUrl = assetWorkflow.BimModelUrl();
        CurrentBimModelHash = assetWorkflow.BimModelHash();
        AssetWorkFlows[assetWorkflow.CompletionTime()] = msg.sender;
    }
}