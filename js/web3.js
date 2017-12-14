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
    callbackOnSuccess(new requiemApplication());
    
    return;
  } 

    callbackOnError("Failed to connect to Metamask");
    return;

}

class requiemApplication { 
    
    constructor() {
      this.contractABI = undefined;
      this.contractObj = undefined;
      this.attachedContract = undefined;
      this.contractAddress = undefined;
      this.metaMaskAccount = undefined;
      
    }
    
    onLoad() {
      
          // do web3 checks
      
          this.metaMaskAccount = window.web3.eth.accounts[0];
          
          if (this.metaMaskAccount === undefined) {
              console.log("No ethereum account was found.");
          }
          else {
            console.log("Metamask Account loaded, " + this.metaMaskAccount)
          }
          
          this.contractObj = window.web3.eth.contract(this.contractABI);
          this.attachedContract = this.contractObj.at(this.contractAddress);
      }
      
      findRequiem (capsuleID, onSuccess, onFail) {
          this.attachedContract.GetRequiem.call(capsuleID,{from: window.web3.eth.accounts[0]}, function(error, result) {
            
            if (error == undefined) {
              onSuccess(result);
            }
            else {
              onFail(error);
            }
              
          });
      }
      
      releaseRequiem(message) {
              
              var finneyPrice = window.web3.toWei('25', 'finney');
              console.log(window.web3.toWei('25', 'finney'));
              
              this.attachedContract.DeployRequiem(message, "", {gas: 500000, from: window.web3.eth.accounts[0], value: finneyPrice}, function(error, transactionHash) {
                  console.log(transactionHash);
                  console.log(window.web3.toWei('25', 'finney'));
              });
      }
  
};







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