pragma solidity ^0.5.6;
import "./StringHelper.sol";
contract Property
{
    address public PropertyOwner;
    string public BimModelHash;
    string public BimModelUrl;
    string public Address;    
    StringHelper public sh;
    mapping(uint => address )  public AssetWorkFlows;

    constructor(string memory propertyAddress) public
    {
        Address = propertyAddress;
    }
    
    function AddBimModel(string memory bimModelUrl, string memory bimModelHash) public
    {
        if( msg.sender != PropertyOwner|| sh.IsStringEmpty(bimModelUrl) || sh.IsStringEmpty(bimModelHash))
        {
            revert();
        }
        BimModelUrl = bimModelUrl;
        BimModelHash = bimModelHash;
    }
}