/* global $*/	
/* global vex*/

window.requiem = undefined;

$(document).ready(function() {

  $(document).foundation();
  
  $(".navBarButton").mouseenter(function() {
      
      $(this).velocity({backgroundColor:"#FFF"}, {queue:false, duration:1000});
      $(this).find("i").first().velocity({color:"#000"}, {queue:false, duration:1000});
    
  });
  
  $(".navBarButton").mouseleave(function() {
    
    
    if (this.isToggled != undefined && this.isToggled === true) {
      return;
    }
    
    $(this).velocity({backgroundColor:"#000"}, {queue:false, duration:1000});
    $(this).find("i").first().velocity({color:"#FFF"}, {queue:false, duration:1000});
    
  });
  
  $("#navBarButton-shuffle").click(function() {
    
    var whiteout = $("#whiteout-screen");
    whiteout.css("opacity", "0.0");
    whiteout.css("visibility", "visible");
    
    if (window.requiem) {
      
      $("#whiteout-screen").velocity({opacity: "1.0"}, {queue:false, duration:2000, complete: function() {
      
      window.requiem.getIndex(function(result) {
        
      var randomRequiem =  Math.random() * (result - 1) + 1;
      
      var changeMessage = function(args) {
        
        $("#quote-model-message").text(args["message"]);
        $("#quote-model-honorary").text(args["to"]);
        $("#quote-model-sender").text(args["from"]);
        
        $("#whiteout-screen").velocity({opacity:"0.0"}, {duration:2000, complete: function() {
          $("#whiteout-screen").css("visibility", "hidden");
        }})
      }
    
      window.requiem.findRequiem(randomRequiem, changeMessage);
        
      }, function(result) {console.log(result)} );
      }});
    }
    
  });
  
  
  $("#navBarButton-add").click(function() {
    
    var whiteout = $("#whiteout-add");
    whiteout.css("opacity", "0.0");
    whiteout.css("visibility", "visible");
    
    $("#whiteout-add")
    .velocity({opacity: "1.0"}, {queue:false, duration:2000});
    
  });
  
  $("#white-closeButton").click(function(e) {
    
    e.preventDefault();
    $("#whiteout-add").velocity({opacity:"0.0"}, {duration:2000, complete: function() {$(this).css("visibility", "hidden");}})
    
  });
  
  $("#navBarButton-find").get(0).isToggled = false;
  
  $("#navBarButton-find").click(function(e) {
    
    
          
      if (this.isToggled === false) {
        $(this).velocity({backgroundColor:"#FFF"}, {queue:false, duration:1000});
        $(this).find("i").first().velocity({color:"#000"}, {queue:false, duration:1000});
        $("#searchForm").velocity({width: "50%", opacity:1.0}, { queue: false, duration: 1500 })
      }
      else {
        $(this).velocity({backgroundColor:"#000"}, {queue:false, duration:1000});
        $(this).find("i").first().velocity({color:"#FFF"}, {queue:false, duration:1000});
        $("#searchForm").velocity({width: 0, opacity:0}, { queue: false, duration: 1500 })
      }
      
      this.isToggled = !this.isToggled;
    
  })
  
  $('.textArea').flowtype({
   maxFont   : 25,
   fontRatio : 30
  });
  
  
  $('.option-input').click(function() {
    
    var domCheckbox = $(this).get(0);
    
    if (domCheckbox.isChecked === undefined)
    domCheckbox.isChecked = false;
    
    domCheckbox.isChecked = !(domCheckbox.isChecked);
    
    var domCheckboxIcon = $(this).find(".checkboxIcon").get(0);
    
    if (domCheckbox.isChecked)
      domCheckboxIcon.style.color = "#000"
    else
      domCheckboxIcon.style.color ="#FFF";
    
  });

$("#form-model-submit").click(function () {
  
  $("#whiteout-screen").css("opacity", "1.0");
  $("#whiteout-screen").css("visibility", "visible");
  
  $("#white-closeButton").click();
  
  $("#whiteout-screen").velocity({opacity: "1.0"}, {queue:false, duration:0, complete: function() {
    
    var resultSender = $("#form-model-sender").val();
    var resultHonorary = $("#form-model-honorary").val();
    var resultMessage = $("#form-model-message").val();
    
    if (window.requiem) {
      window.requiem.releaseRequiem(resultMessage, resultSender, resultHonorary, function(args) {
        console.log(args)
        $("#quote-model-message").text(args["message"]);
        $("#quote-model-honorary").text(args["to"]);
        $("#quote-model-sender").text(args["from"]);

        vex.dialog.alert("Your Requiem ID is: '" + args["index"]["c"][0]  + "' be sure to write it down somewhere!")
        
        $("#whiteout-screen").velocity({opacity:"0.0"}, {duration:2000, complete: function() {
          $("#whiteout-screen").css("visibility", "hidden");
        }})
      });
    }
    
  }});
  
})

$('#searchForm').on('keypress', function (e) {
      if(e.which === 13){

         //Disable textbox to prevent multiple submit
         $(this).attr("disabled", "disabled");

    var whiteout = $("#whiteout-screen");
    whiteout.css("opacity", "0.0");
    whiteout.css("visibility", "visible");
    
    if (window.requiem) {
      
      $("#whiteout-screen").velocity({opacity: "1.0"}, {queue:false, duration:2000, complete: function() {
        
      var requiemID =  parseInt($("#searchForm").val());
      
      var changeMessage = function(args) {
        
        $("#quote-model-message").text(args["message"]);
        $("#quote-model-honorary").text(args["to"]);
        $("#quote-model-sender").text(args["from"]);
        
        $("#whiteout-screen").velocity({opacity:"0.0"}, {duration:2000, complete: function() {
          $("#whiteout-screen").css("visibility", "hidden");
        }})
      }
    
      window.requiem.findRequiem(requiemID, changeMessage);
        
      
      }});
    }

         //Enable the textbox again if needed.
         $(this).removeAttr("disabled");
      }
});


});

function loadWeb3_callbackOnError() {
  
  
}

function loadWeb3_callbackOnSuccess(generatedReq) {
  
  console.log(generatedReq);
  window.requiem = generatedReq;
  
  window.requiem.contractABI = [{"constant":false,"inputs":[{"name":"message","type":"string"},{"name":"from","type":"string"},{"name":"to","type":"string"}],"name":"DeployRequiem","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"index","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"index","type":"uint256"},{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"from","type":"string"},{"indexed":false,"name":"to","type":"string"}],"name":"RequiemEvent","type":"event"}];
  window.requiem.contractAddress ="0x48230b4231669aceb00265d1115261f8222ab997";
  
  window.requiem.onLoad();
  
  var changeMessage = function(args) {
    $("#quote-model-message").text(args["message"]);
    $("#quote-model-honorary").text(args["to"]);
    $("#quote-model-sender").text(args["from"]);
    console.log(args);
  }
  
  window.requiem.findRequiem(2, changeMessage);
  
  
  
}

window.addEventListener('load', function() {
  loadWeb3(loadWeb3_callbackOnError, loadWeb3_callbackOnSuccess) 
});

function loadRequiem(id) {
  
  
  
}

/* 
global loadWeb3 
*/



// RA.attachedContract.GetCurrentNonce.call(0x2, {from: RA.web3.eth.accounts[0]}, function(err, result) {console.log(result)});