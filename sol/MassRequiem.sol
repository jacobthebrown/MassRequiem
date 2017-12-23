pragma solidity ^0.4.0;

/*
*   
*/
contract MassReqiuem {


    modifier isOwner() {
        require(msg.sender == creator);
        _;
    }
    
    modifier notLocked() {
        require(!locked);
        _;
    }
    
    event RequiemEvent (
        uint indexed index,
        string message,
        string from,
        string to
    );

    /*
    *   Struct housing all necessary information
    */
    struct Requiem {
        
        address owner;
        bool Created;
        string message;
        string pictureBase64Encoded;
        
    }

    // Creator of the Memoreum contract.
    address private creator;
    
    // 
    bool private locked;
    
    // The number of Requiems creatd.
    uint256 public index;

    /*
    *
    */
    function MassReqiuem() public {
        
        creator = msg.sender;
        index = 0;
        locked = false;
        
    }
    
    /*
    *
    */
    function DeployRequiem(string message, string from, string to) public notLocked returns (uint) {
        
        RequiemEvent(++index, message, from, to);
        return index;
        
    }
    
}