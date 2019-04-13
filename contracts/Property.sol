pragma solidity ^0.5.6;
import "./StringHelper.sol";
import "./SharedModels.sol";
import "./AssetWorkflow.sol";

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
    function StoreAssetWorkflow() public
    {
        AssetWorkflow assetWorkflow = AssetWorkflow(msg.sender);
        CurrentBimModelUrl = assetWorkflow.BimModelUrl();
        CurrentBimModelHash = assetWorkflow.BimModelHash();
        AssetWorkFlowList[assetWorkflow.CompletionTime()] = msg.sender;
    }
}