// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract adoption {
  address[16] public petAdopters; //pets.json file total pets are 16

  function getAdopters() public view returns(address[16] memory)
  {
    return petAdopters;
  }

  function adopt(uint petId) public returns(uint)
  {
    require (petId>=0 && petId<=15) ; //should not use if statement because in third test case, it would not receive any error for if statement
    petAdopters[petId]=msg.sender; 
    return petId;
  }
}
