pragma solidity ^0.5.6;

library StringHelper
{
    function IsStringEmpty(string memory s) public pure returns (bool)
    {
        bytes memory stringByteArray = bytes(s); 
        if (stringByteArray.length == 0) 
        {
            return true;
        } 
        else 
        {
            return false;
        }
    }
}