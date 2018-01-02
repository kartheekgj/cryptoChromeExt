var aCurr = ["XRP","BTC","ETH","LTC","MIOTA"];
document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', getData(), false);
  document.getElementById("checkPage").click();
  document.getElementById('color').onchange = getSelectedCurr;
}, false);

   
function getData(curr) {
  var oCurr  = document.getElementById('color').value || 'XRP';
  var title = document.getElementById('color').options[document.getElementById('color').selectedIndex].text
     $.ajax({
        url: "https://koinex.in/api/ticker",
        crossDomain: true,
        success: function(oData){
          var price = oData.prices[oCurr].toString();
          chrome.notifications.create("RipplePriceCheck",{
            type:     'basic',
            iconUrl:  "./icons/" + oCurr + ".png",
            title:    title,
            message:  price,
            buttons: [
              {title: 'Dismiss'}
            ],
          priority: 0});
          chrome.notifications.onButtonClicked.addListener(function(){
            chrome.notifications.clear("RipplePriceCheck");
          });
        },
        error: function(a,b,c){
          console.log(a,b,c);
        }
     });
}
function showAllData(){
  $.ajax({
      url: "https://koinex.in/api/ticker",
      crossDomain: true,
      success: function(oData){
        var objItems = [];
        aCurr.forEach(function(data){
          objItems.push({title: data, message: oData.prices[data].toString()});
        });
        chrome.notifications.create("RipplePriceCheck",{
          type:     'list',
          iconUrl:  "./icons/inr.jpeg",
          title:    "All Data",
          message: "Shows data for various crypto currencies",
          items: objItems,
          buttons: [
            {title: 'Dismiss'}
          ],
        priority: 0});
        chrome.notifications.onButtonClicked.addListener(function(){
          chrome.notifications.clear("RipplePriceCheck");
        });
      },
      error: function(a,b,c){
        console.log(a,b,c);
      }
   });
}


function getSelectedCurr(){
  var selectedCurr = document.getElementById('color').value;
  /*chrome.storage.sync.set({
    favoriteColor: selectedCurr
  });*/
  console.log(selectedCurr);
  if(selectedCurr.toLowerCase() === "all"){
    showAllData()
  }else{
    getData(selectedCurr);  
  }
  
} 


/*function save_options() {
  var color = document.getElementById('color').value;
  var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
*/
    


