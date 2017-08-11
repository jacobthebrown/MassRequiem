/* global $*/	

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
    
    $("#whiteout-screen")
    .velocity({opacity: "1.0"}, {queue:false, duration:2000, complete: function() {
      
      $(this).velocity({opacity:"0.0"}, {duration:2000, complete: function() {$(this).css("visibility", "hidden");}})
      
    }});
    
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

});


/* 
global loadWeb3 
*/

function loadWeb3_callbackOnError() {
  
  
}

function loadWeb3_callbackOnSuccess(reqiuemApplication) {
  
  reqiuemApplication.contractABI = [];
  reqiuemApplication.contractAddress =[];
  
  reqiuemApplication.load();
  
  
}

window.addEventListener('load', loadWeb3(loadWeb3_callbackOnError, loadWeb3_callbackOnSuccess));

