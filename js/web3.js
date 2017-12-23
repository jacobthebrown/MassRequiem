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
      
      findRequiem (id, onSuccess, onFail) {
          
          this.attachedContract.RequiemEvent({index: id}, { fromBlock: 0 }).get((error, result) => { 
            
            if (error == undefined) {
              if (result.length == 1) { 
                onSuccess(result[0]["args"]);
              }
              else {
                onFail(error = {id: 404, message: "No arguments found"});
              }
            }
            else {
              onFail(error);
            }
            
          });

      }
      
      watchForRequiem (msg, fr, t, onSuccess, onFail) {
          
          this.attachedContract.RequiemEvent({message: msg, from: fr, to: t}, { fromBlock: 0 }).watch((error, result) => { 
            
            console.log(error)
            console.log(result)
            
            if (error == undefined) {
              onSuccess(result["args"]);
            }
            else {
              onFail(error);
            }
            
          });

      }
      
      releaseRequiem(message, from, to, OnSuccess, onFail) {
              
              this.attachedContract.DeployRequiem(message, from, to, {gas: 500000, from: window.web3.eth.accounts[0]}, function(error, transactionHash, obj) {
                
                if (!error) {
                  console.log("Transaction created.")
                  window.requiem.watchForRequiem(message, from, to, OnSuccess, onFail);
                }
              });
              
      }
      
      getIndex(onSuccess, onFail) {
        
        this.attachedContract.index.call(function (error, result) {
          console.log(result);
          if (error == undefined) {
            onSuccess(result["s"]);
          }
          else {
            onFail(error);
          }
          
        })
        
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