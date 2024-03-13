// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Identity {
    using Counters for Counters.Counter;
    
    struct IdentityData {
        string name; // Name of the person (hashed)
        string dob; // Date of birth (hashed)
        string aadhaarNumber; // Aadhaar Number (hashed)
        string gender; // Gender (hashed)
        string contact_no; // Contact No (hashed)
        string email; // Email  (hashed)
        string blood_group; // Blood group (hashed)
        string city; // City (hashed)
        string state; //State (hashed)
        string photoHash; // IPFS hash of photo (hashed)
    }

    Counters.Counter private identityIds; // for getting the total number of identities created

    mapping(address => IdentityData) private identityData; // mapping address to identity data

    constructor(string memory _name, string memory _symbol) {}

    event IdentityCreated(address indexed owner);
    

    // Returns uint
    // Start  - 0
    // Processing  - 1
    // Completed - 2
    // Canceled - 3
    
    mapping(address=> uint8) public status;
    function set_status(uint8 _status) public {
        status[msg.sender]= _status;
    }


    function setDetails(
        string memory _name,
        string memory _dob,
        string memory _aadhaarNumber,
        string memory _gender,
        string memory _contact_no,
        string memory _email,
        string memory _blood_group,
        string memory _city,
        string memory _state,
        string memory _photoHash
    ) public  {
        // uint256 id = identityIds.current();
        require(
            keccak256(abi.encodePacked(identityData[msg.sender].name)) ==
                keccak256(abi.encodePacked("")),
            "Identity already exists"
        );
        identityIds.increment();
        identityData[msg.sender] = IdentityData(
            _name,
            _dob,
            _aadhaarNumber,
            _gender,
            _contact_no,
            _email,
            _blood_group,
            _city,
            _state,
            _photoHash
        );
        emit IdentityCreated(msg.sender); // emit event for identity creation
    }

    function getDetails() external view returns (IdentityData memory) {
        return identityData[msg.sender];
    }

    // returns the total number of identities created
    function getTotalIdentities() external view returns (uint256) {
        return identityIds.current();
    }
}
