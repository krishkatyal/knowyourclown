// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/utils/Counters.sol';

contract Identity {

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

    mapping(uint256 => IdentityData) private identityData;
    Counters.Counter private identityIds;

    constructor(string memory _name, string memory _symbol)  {}

    function setDetails(
        string memory _name,
        string memory _dob,
        string memory _aadhaarNumber,
        string memory gender,
        string memory contact_no,
        string memory email,
        string memory blood_group,
        string memory city,
        string memory state,
        string memory photoHash
    ) external {
        uint256 id = identityIds.current();
        identityIds.increment();
        identityData[id] = identityData(
            _name,
            _dob,
            _aadhaarNumber,
            gender,
            contact_no,
            email,
            blood_group,
            city,
            state,
            photoHash
        );
    }

    function getDetails(uint256 _id) external view returns (IdentityData memory) {
        return identityData[_id];
    }

    // returns the total number of identities created
    function getTotalIdentities() external view returns (uint256) {
        return identityIds.current();
    }

    // function createIdentityNFT(
    //     uint256 tokenId,
    //     string memory name,
    //     string memory dob,
    //     string memory passportNumber
    //     // string memory panNumber
    // ) external {
    //     _mint(msg.sender, tokenId);
    //     userData[tokenId] = UserData(name, dob, passportNumber);
    //     // userData[tokenId] = UserData(name, dob, passportNumber, panNumber);
    // }

    // function getIdentityData(uint256 tokenId) external view returns (UserData memory) {
    //     return userData[tokenId];
    // }
}
