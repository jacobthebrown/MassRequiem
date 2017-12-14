pragma solidity ^0.4.0;

/*
*   
*/
contract MassReqiuem {


    modifier isOwner() {
        require(msg.sender == creator);
        _;
    }

    // Creator of the Memoreum contract.
    address public creator;
    
    // The number of Requiems creatd.
    uint256 public requiemCount;
    
    // The current price to post a Requiem in finney. 1000 finney = 1 eth.
    uint public finneyPrice;
    
    // ID mapping to Requiems.
    mapping(uint256 => Requiem) requiemMapping;
    
    /*
    *   Struct housing all necessary information
    */
    struct Requiem {
        
        address owner;
        bool Created;
        string message;
        string pictureBase64Encoded;
        
    }

    /*
    *
    */
    function MassReqiuem() public {
        
        creator = msg.sender;
        requiemCount = 0;
        finneyPrice = 25 finney;
        
    }
    
    function SetPrice(uint newPrice) public isOwner {
        
        finneyPrice = newPrice / 1000;      // Price of a Finney 1/1000th of an ethereum.
        
    }
    
    /*
    *
    */
    function DeployRequiem(string message, string pictureBase64) public payable returns (uint) {
        
        require( msg.value == finneyPrice );
        assert( !requiemMapping[++requiemCount].Created );
                
        requiemMapping[requiemCount] = Requiem ({
            owner: msg.sender,
            Created: true, 
            message: message, 
            pictureBase64Encoded : pictureBase64
        });
        
        return requiemCount;
        
    }
    
    function GetRequiem(uint256 id) public constant returns (bool created, string pictureBase64, string message) {
        
        return (requiemMapping[id].Created, requiemMapping[id].pictureBase64Encoded, requiemMapping[id].message);
        
    }
    
}