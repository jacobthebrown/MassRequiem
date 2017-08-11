/* 
global Web3 
global web3
global $
*/

var reqApp;

function loadWeb3(callbackOnError, callbackOnSuccess) {

  if (typeof web3 !== 'undefined') 
  {
    console.log("MetaMask Found");
    window.web3 = new Web3(web3.currentProvider);
    callbackOnSuccess(reqiuemApplication);
    
    return;
  } 

    callbackOnError("Failed to connect to Metamask");
    return;

}

var reqiuemApplication = { 
    
    contractABI : undefined,
    contractObj : undefined,
    attachedContract : undefined,
    contractAddress : undefined,
    metaMaskAccount : undefined,
    
    load : function( ) {
    
        this.metaMaskAccount = web3.eth.accounts[0];
        
        if (this.metaMaskAccount === undefined) {
            console.log("No ethereum account was found.");
        }
        
        this.contractObj = web3.eth.contract(this.contractABI);
        this.attachedContract = this.contractObj.at(this.contractAddress);
    },
    
    findReqiuem : function(capsuleID) {
        this.attachedContract.getCapsule.call(capsuleID,{from: web3.eth.accounts[0]}, function(error, result) {
        console.log(result)
            
        });
    },
    
    releaseReqiuem : function(message, to, from) {
            
            this.attachedContract.ReleaseReqiuem(message, to, from, {from:web3.eth.accounts[0], value: web3.toWei(0.01, "ether")}, function(error, transactionHash) {
                console.log(transactionHash);
            })
    }
    
    /**
     *             


     //sol_attachedContract.owner.call({from: web3.eth.accounts[0]}, function(error, result) {console.log("Contract Owner: " + result)});

        $("#model_capsuleRelease_submit").click(function(e){
          
          e.preventDefault()
                
          // TODO: Validate inputs.
          var message = $("#model_capsuleRelease_message").val();
          var to = $("#model_capsuleRelease_to").val();
          var from = $("#model_capsuleRelease_from").val();
          
          console.log("Submit Capsule" + to + from + message);
          
          releaseCapsule(message, to, from);
          
        });
        
        $("#model_getCapsule_submit").click(function(e){
          
          e.preventDefault()
                
          // TODO: Validate inputs.
          
          findCapsule($("#model_getCapsule_id").val());
          
        });
    **/
    
};